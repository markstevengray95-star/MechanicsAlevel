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
    await page.locator('#simCanvas').scrollIntoViewIfNeeded();
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
    const presetCount=await page.locator('[data-sim-preset]').count();
    assert(presetCount===3,'Simulation should expose 3 presets: '+title+' has '+presetCount);
    const knowledgeCount=await page.locator('#keyKnowledge li').count();
    assert(knowledgeCount>=4,'Simulation key knowledge incomplete: '+title+' has '+knowledgeCount);
    const metricCount=await page.locator('#simMetrics .sim-metric').count();
    assert(metricCount>=3,'Simulation live metrics incomplete: '+title+' has '+metricCount);
    assert((await page.locator('#simChallenge').innerText()).trim().length>15,'Simulation challenge missing: '+title);
    await page.locator('[data-sim-preset]').first().click();
    assert((await page.locator('#simReadout').innerText()).trim().length>0,'Preset failed to update readout: '+title);

    // Real mouse drag across the simulation canvas.
    const beforeDrag=await page.locator('#simControls input[type="range"]').evaluateAll(xs=>xs.map(x=>x.value).join('|'));
    const beforeReadout=(await page.locator('#simReadout').innerText()).trim();
    const canvas=page.locator('#simCanvas');
    await canvas.hover({position:{x:box.width*.25,y:box.height*.25}});
    await page.mouse.down();
    await canvas.hover({position:{x:box.width*.72,y:box.height*.64}});
    await page.mouse.up();
    await page.waitForTimeout(20);
    const afterDrag=await page.locator('#simControls input[type="range"]').evaluateAll(xs=>xs.map(x=>x.value).join('|'));
    const afterReadout=(await page.locator('#simReadout').innerText()).trim();
    assert((await page.locator('#simState').innerText()).includes('Direct control'),'Mouse drag did not enter direct control: '+title);
    assert(beforeDrag!==afterDrag||beforeReadout!==afterReadout,'Mouse drag did not change simulation state: '+title);

    // Touch-style PointerEvents exercise the same direct manipulation path used by phones/tablets.
    const touchBefore=await page.locator('#simControls input[type="range"]').evaluateAll(xs=>xs.map(x=>x.value).join('|'));
    const touchReadoutBefore=(await page.locator('#simReadout').innerText()).trim();
    await page.locator('#simCanvas').evaluate(el=>{
      const r=el.getBoundingClientRect();
      const fire=(type,fx,fy,buttons)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerId:901,pointerType:'touch',isPrimary:true,buttons,clientX:r.left+r.width*fx,clientY:r.top+r.height*fy}));
      fire('pointerdown',.72,.24,1);
      fire('pointermove',.34,.45,1);
      fire('pointerup',.34,.45,0);
    });
    await page.waitForTimeout(20);
    const touchAfter=await page.locator('#simControls input[type="range"]').evaluateAll(xs=>xs.map(x=>x.value).join('|'));
    const touchReadoutAfter=(await page.locator('#simReadout').innerText()).trim();
    assert((await page.locator('#simState').innerText()).includes('Direct control'),'Touch drag did not enter direct control: '+title);
    assert(touchBefore!==touchAfter||touchReadoutBefore!==touchReadoutAfter,'Touch drag did not change simulation state: '+title);

    const first=page.locator('#simControls input[type="range"]').first();
    const min=Number(await first.getAttribute('min'));
    const max=Number(await first.getAttribute('max'));
    const value=String(min+(max-min)*0.6);
    await first.evaluate((el,val)=>{el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));},value);
    assert((await page.locator('#simReadout').innerText()).trim().length>0,'Simulation readout empty: '+title);
    await page.locator('#recordSim').click();
    assert(await page.locator('#simDataRows tr').count()>=1,'Simulation data logging failed: '+title);
    await page.locator('#clearSimData').click();
  }

  // Virtual experiment studio: prediction, linked view, timeline, measurements, FBD, investigation, scenario and sandbox.
  await page.locator('#simTabs .sim-tab').first().click();
  await page.waitForTimeout(40);
  assert((await page.locator('#simPredictionPrompt').innerText()).trim().length>20,'Prediction prompt missing');
  assert(await page.locator('#investigationSteps li').count()>=3,'Guided investigation steps missing');
  assert((await page.locator('#scenarioStory').innerText()).trim().length>20,'Scenario story missing');
  assert((await page.locator('#scenarioGoal').innerText()).trim().length>15,'Scenario goal missing');

  const linkedPixels=await page.locator('#linkedSimCanvas').evaluate(el=>{
    const d=el.getContext('2d').getImageData(0,0,el.width,el.height).data;let n=0;
    for(let i=3;i<d.length;i+=Math.max(4,Math.floor(d.length/6000/4)*4)){if(d[i]>0)n++;}
    return n;
  });
  assert(linkedPixels>5,'Linked graph view appears blank');

  await page.locator('#simPrediction').fill('The vertical component should increase as the angle increases.');
  await page.locator('#lockPrediction').click();
  assert((await page.locator('#simPredictionFeedback').innerText()).includes('Prediction locked'),'Prediction did not lock');
  await page.locator('#revealPrediction').click();
  assert((await page.locator('#simPredictionFeedback').innerText()).includes('Physics explanation'),'Prediction explanation did not reveal');

  const timeline=page.locator('#simTimeline');
  await timeline.fill('500');
  assert((await page.locator('#simState').innerText()).includes('Timeline scrub'),'Timeline scrub did not activate');
  assert((await page.locator('#timelineOutput').innerText()).trim().length>0,'Timeline output missing');

  const firstControl=page.locator('#simControls input[type="range"]').first();
  const baseMax=Number(await firstControl.getAttribute('max'));
  await page.locator('#sandboxToggle').click();
  const sandboxMax=Number(await firstControl.getAttribute('max'));
  assert(sandboxMax>baseMax,'Sandbox did not expand control range');
  assert((await page.locator('#sandboxToggle').innerText()).includes('on'),'Sandbox did not turn on');
  await page.locator('#sandboxToggle').click();

  assert(await page.locator('[data-measure-tool]').count()===7,'Measurement toolbelt incomplete');
  await page.locator('[data-measure-tool="ruler"]').click();
  const measureCanvas=page.locator('#simCanvas');
  await measureCanvas.scrollIntoViewIfNeeded();
  const mb=await measureCanvas.boundingBox();
  await measureCanvas.evaluate(el=>{
    const r=el.getBoundingClientRect();
    const fire=(type,fx,fy,buttons)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerId:777,pointerType:'mouse',isPrimary:true,buttons,clientX:r.left+r.width*fx,clientY:r.top+r.height*fy}));
    fire('pointerdown',.2,.25,1);fire('pointermove',.7,.6,1);fire('pointerup',.7,.6,0);
  });
  assert((await page.locator('#simMeasureReadout').innerText()).includes('Canvas distance'),'Ruler measurement did not update');
  await page.locator('[data-measure-tool="probe"]').click();

  await page.locator('.sim-mode-panel summary').filter({hasText:'Free-body diagram builder'}).click();
  await page.locator('#fbdForceType').selectOption({label:'Applied'});
  await page.locator('#fbdDirection').selectOption('0');
  await page.locator('#addFbdForce').click();
  await page.locator('#checkFbd').click();
  assert((await page.locator('#fbdFeedback').innerText()).includes('Correct'),'Free-body diagram checker did not validate expected vector force');

  const guidedSummary=page.locator('.sim-mode-panel summary').filter({hasText:'Guided investigation'});
  await guidedSummary.click();
  await page.locator('#startInvestigation').click();
  const angleControl=page.locator('[data-control="angle"]');
  for(const value of ['20','45','70']){
    await angleControl.evaluate((el,val)=>{el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));},value);
    await page.locator('#recordSim').click();
  }
  await page.locator('#analyseInvestigation').click();
  assert((await page.locator('#investigationFeedback').innerText()).includes('Across your recorded range'),'Investigation analysis did not run');

  const scenarioSummary=page.locator('.sim-mode-panel summary').filter({hasText:'Scenario challenge'});
  await scenarioSummary.click();
  await page.locator('#loadScenario').click();
  await angleControl.evaluate(el=>{el.value='45';el.dispatchEvent(new Event('input',{bubbles:true}));});
  assert((await page.locator('#scenarioState').innerText()).includes('Completed'),'Scenario challenge did not detect success');

  await page.locator('#stepSim').click();
  assert((await page.locator('#simState').innerText()).includes('Stepped'),'Step-time control failed');
  await page.locator('#showGrid').uncheck();
  await page.locator('#showGrid').check();
  await page.locator('#showVectors').uncheck();
  await page.locator('#showVectors').check();
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
