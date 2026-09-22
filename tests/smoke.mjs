import { chromium } from 'playwright';

const base = process.env.SMOKE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000}});
const pageErrors=[];
const consoleErrors=[];

page.on('pageerror', e => pageErrors.push(e.message));
page.on('console', m => { if(m.type()==='error') consoleErrors.push(m.text()); });

function assert(cond,msg){ if(!cond) throw new Error(msg); }

try {
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForSelector('.main-nav',{timeout:10000});
  await page.waitForTimeout(250);
  if(pageErrors.length) throw new Error('Startup page errors: '+pageErrors.join(' | '));

  const navViews = await page.locator('.nav-button').evaluateAll(btns=>btns.map(b=>b.dataset.view));
  for(const view of navViews){
    await page.locator('[data-view="'+view+'"]').click();
    await page.waitForTimeout(40);
    const visible = await page.locator('#view-'+view).evaluate(el=>el.classList.contains('active-view'));
    assert(visible,'View did not activate: '+view);
  }

  await page.locator('[data-view="course"]').click();
  const lessonCount=await page.locator('.course-button').count();
  assert(lessonCount===17,'Expected 17 lessons, found '+lessonCount);
  for(let i=0;i<lessonCount;i++){
    await page.locator('.course-button').nth(i).click();
    await page.waitForTimeout(20);
    assert((await page.locator('#lessonPanel h2').innerText()).trim().length>0,'Lesson title missing at '+i);
    const chunks=await page.locator('#lessonPanel .chunk-button').count();
    assert(chunks>=13,'Lesson '+i+' has too few chunks: '+chunks);
    for(let j=0;j<chunks;j++){
      await page.locator('#lessonPanel .chunk-button').nth(j).click();
      const active=await page.locator('#lessonPanel .chunk.active').count();
      assert(active===1,'Lesson chunk did not activate at lesson '+i+' chunk '+j);
    }
  }

  await page.locator('[data-view="lab"]').click();
  const simCount=await page.locator('#simTabs .sim-tab').count();
  if(pageErrors.length) throw new Error('Page errors before simulation audit: '+pageErrors.join(' | '));
  assert(simCount===20,'Expected 20 simulations, found '+simCount);
  for(let i=0;i<simCount;i++){
    await page.locator('#simTabs .sim-tab').nth(i).click();
    await page.waitForTimeout(40);
    const title=(await page.locator('#simTitle').innerText()).trim();
    assert(title.length>0,'Simulation title missing at '+i);
    const box=await page.locator('#simCanvas').boundingBox();
    assert(box && box.width>200 && box.height>200,'Simulation canvas not visible at '+i);
    const canvasState=await page.locator('#simCanvas').evaluate(el=>{
      const ctx=el.getContext('2d');
      const data=ctx.getImageData(0,0,el.width,el.height).data;
      let nonzero=0;
      const stride=Math.max(4,Math.floor(data.length/12000/4)*4);
      for(let p=3;p<data.length;p+=stride){ if(data[p]>0) nonzero++; }
      return {width:el.width,height:el.height,clientWidth:el.clientWidth,clientHeight:el.clientHeight,nonzero};
    });
    assert(canvasState.width>=canvasState.clientWidth,'Canvas backing width too small: '+title);
    assert(canvasState.height>=canvasState.clientHeight,'Canvas backing height too small: '+title);
    assert(canvasState.nonzero>5,'Simulation canvas appears blank: '+title);
    const controlCount=await page.locator('#simControls input[type="range"]').count();
    assert(controlCount>0,'Simulation has no controls: '+title);
    const activityCount=await page.locator('[data-sim-activity]').count();
    assert(activityCount===3,'Simulation should expose 3 activities: '+title+' has '+activityCount);
    const first=page.locator('#simControls input[type="range"]').first();
    const min=Number(await first.getAttribute('min'));
    const max=Number(await first.getAttribute('max'));
    const value=String(min+(max-min)*0.6);
    await first.evaluate((el,val)=>{el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));},value);
    assert((await page.locator('#simReadout').innerText()).trim().length>0,'Simulation readout empty: '+title);
  }

  await page.locator('[data-view="formula"]').click();
  const formulaCount=await page.locator('#formulaSelect option').count();
  assert(formulaCount===42,'Expected 42 formula tools, found '+formulaCount);
  const values=await page.locator('#formulaSelect option').evaluateAll(opts=>opts.map(o=>o.value));
  for(const value of values){
    await page.locator('#formulaSelect').selectOption(value);
    await page.waitForTimeout(10);
    const info=(await page.locator('#formulaInfo').innerText()).trim();
    const working=(await page.locator('#formulaWorking').innerText()).trim();
    assert(info.length>20,'Formula guidance missing for index '+value);
    assert(working.length>10,'Formula working missing for index '+value);
  }

  await page.locator('[data-view="skills"]').click();
  await page.locator('#newSkillQuestion').click();
  assert((await page.locator('#skillQuestion').innerText()).trim().length>0,'Skill question failed to generate');

  await page.locator('[data-view="practical"]').click();
  await page.locator('[data-practical="g"]').click();
  await page.locator('#takeGReading').click();
  assert(await page.locator('#gRows tr').count()>=1,'RP3 reading not added');
  await page.locator('[data-practical="young"]').click();
  await page.locator('#takeYReading').click();
  assert(await page.locator('#yRows tr').count()>=1,'RP4 reading not added');

  await page.locator('[data-view="exam"]').click();
  const choice=page.locator('[data-choice]').first();
  await choice.click();
  assert((await page.locator('#quizFeedback').innerText()).trim().length>0,'Exam feedback missing');

  await page.locator('[data-view="spec"]').click();
  assert(await page.locator('#specGrid .spec-card').count()>=12,'Specification checklist did not render');

  if(pageErrors.length) throw new Error('Page errors: '+pageErrors.join(' | '));
  const seriousConsole=consoleErrors.filter(x=>!x.includes('favicon'));
  if(seriousConsole.length) throw new Error('Console errors: '+seriousConsole.join(' | '));

  console.log(JSON.stringify({
    status:'PASS',
    lessons:lessonCount,
    simulations:simCount,
    formulas:formulaCount,
    views:navViews.length
  }));
} finally {
  await browser.close();
}
