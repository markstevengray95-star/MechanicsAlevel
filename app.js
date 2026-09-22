(() => {
'use strict';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
const fmt = (n,d=3) => Number.isFinite(n) ? Number(n.toPrecision(d)).toString() : '—';

const lessons = [
{
 id:'vectors', code:'3.4.1.1', title:'Scalars and vectors', sim:'vectors',
 lead:'Build the language of mechanics: distinguish scalar quantities from vector quantities and represent vectors correctly.',
 formulas:['resultant = √(x² + y²)','θ = tan⁻¹(y/x)'],
 retrieval:[
  {q:'What is the SI unit of force?',a:'newton, N'},
  {q:'What is the difference between distance and displacement?',a:'Distance is total path length (scalar); displacement is straight-line change in position with direction (vector).'},
  {q:'Give one scalar and one vector quantity.',a:'Examples: scalar—mass, speed, energy; vector—force, velocity, acceleration, displacement.'}
 ],
 objectives:['Classify physical quantities as scalars or vectors.','Add perpendicular vectors by calculation.','State a resultant with both magnitude and direction.'],
 core:[
  'A scalar has magnitude only. A vector has magnitude and direction.',
  'A vector can be represented by an arrow: the arrow length represents magnitude and its direction represents the vector direction.',
  'For perpendicular vectors, treat the components as the two sides of a right-angled triangle. Use Pythagoras for the magnitude and trigonometry for the direction.',
  'AQA questions often test paired examples: speed/velocity, distance/displacement and mass/weight.'
 ],
 worked:{q:'A student walks 6.0 m east then 8.0 m north. Find the resultant displacement.',a:'Magnitude = √(6.0² + 8.0²) = 10.0 m. Direction = tan⁻¹(8/6) = 53° north of east.'},
 task:'Draw a scale vector diagram for 12 N east and 5 N north. Calculate the resultant independently and compare your measured and calculated answers.',
 check:{q:'Which quantity is a vector?',choices:['Energy','Mass','Velocity','Temperature'],answer:2,explain:'Velocity has both magnitude and direction.'},
 exit:'Explain why an object can travel a large distance but have zero displacement.'
},
{
 id:'resolution', code:'3.4.1.1', title:'Resolving vectors and equilibrium', sim:'equilibrium',
 lead:'Resolve forces into perpendicular components and decide whether several coplanar forces are in equilibrium.',
 formulas:['Fₓ = F cosθ','Fᵧ = F sinθ','ΣF = 0 in equilibrium'],
 retrieval:[
  {q:'What information must be included when stating a vector?',a:'Magnitude and direction.'},
  {q:'What is meant by the resultant force?',a:'The single force with the same effect as all the forces acting together.'},
  {q:'What does equilibrium mean for translational motion?',a:'Resultant force is zero, so acceleration is zero; the object is stationary or moves at constant velocity.'}
 ],
 objectives:['Resolve a force into perpendicular components.','Apply components on an inclined plane.','Use the condition ΣF = 0 for equilibrium.'],
 core:[
  'Resolution replaces one vector with perpendicular component vectors whose combined effect is identical.',
  'If the angle is measured from the horizontal, the horizontal component is F cosθ and the vertical component is F sinθ.',
  'On a slope, choosing axes parallel and perpendicular to the slope often simplifies the calculation. Weight can be resolved into mg sinθ down the slope and mg cosθ into the slope.',
  'For a point in equilibrium, the vector sum of all forces is zero. Three forces can therefore form a closed vector triangle.'
 ],
 worked:{q:'A 200 N force acts at 30° above the horizontal. Find its components.',a:'Horizontal = 200 cos30° = 173 N. Vertical = 200 sin30° = 100 N.'},
 task:'For a 5.0 kg block on a 20° slope, calculate the components of weight parallel and perpendicular to the slope. Use g = 9.81 m s⁻².',
 check:{q:'A body is moving at constant velocity. What is its resultant force?',choices:['It must be increasing','Zero','Equal to its weight','Equal to mv'],answer:1,explain:'Constant velocity means zero acceleration, so the resultant force is zero.'},
 exit:'Describe one situation where resolving a force is more useful than drawing a scale diagram.'
},
{
 id:'moments', code:'3.4.1.2', title:'Moments, couples and centre of mass', sim:'moments',
 lead:'Connect forces to turning effects and use the principle of moments in equilibrium problems.',
 formulas:['moment = F × perpendicular distance','couple moment = F × separation','Σ clockwise moments = Σ anticlockwise moments'],
 retrieval:[
  {q:'What is the SI unit of moment?',a:'N m'},
  {q:'What does perpendicular distance mean in the moment equation?',a:'The shortest distance from the pivot to the line of action of the force.'},
  {q:'What is the condition for rotational equilibrium?',a:'Net moment is zero.'}
 ],
 objectives:['Calculate the moment of a force.','Explain and calculate the moment of a couple.','Apply the principle of moments and centre of mass.'],
 core:[
  'A moment is the turning effect of a force about a point or pivot.',
  'Use the perpendicular distance to the force’s line of action, not simply the distance to where the force is applied.',
  'A couple is two equal, opposite, parallel forces acting along different lines. The resultant force is zero but there is a turning effect.',
  'For equilibrium, total clockwise moment equals total anticlockwise moment about the same point.',
  'The centre of mass is the point through which the whole weight of an object can be treated as acting.'
 ],
 worked:{q:'A 40 N force acts 0.35 m perpendicularly from a pivot. Find the moment.',a:'Moment = 40 × 0.35 = 14 N m.'},
 task:'A 300 N child sits 1.8 m from a seesaw pivot. Where should a 450 N child sit on the opposite side for balance?',
 check:{q:'Which distance must be used in M = Fd?',choices:['Distance from pivot to object centre','Perpendicular distance to the line of action','Vertical distance only','Any measured distance'],answer:1,explain:'Moment uses the perpendicular distance from the pivot to the force’s line of action.'},
 exit:'Explain why a long spanner makes it easier to turn a tight nut.'
},
{
 id:'kinematics', code:'3.4.1.3', title:'Motion quantities and graphs', sim:'motion',
 lead:'Read motion from displacement–time, velocity–time and acceleration–time graphs.',
 formulas:['v = Δs/Δt','a = Δv/Δt','area under v–t = displacement','gradient of v–t = acceleration'],
 retrieval:[
  {q:'What is the difference between speed and velocity?',a:'Velocity includes direction; speed does not.'},
  {q:'What does the gradient of a displacement–time graph represent?',a:'Velocity.'},
  {q:'What does the area beneath a velocity–time graph represent?',a:'Displacement.'}
 ],
 objectives:['Calculate average and instantaneous velocity.','Interpret gradients and areas on motion graphs.','Relate displacement, velocity and acceleration graphically.'],
 core:[
  'Average velocity is total displacement divided by time. Instantaneous velocity is velocity at a particular instant.',
  'The gradient of a displacement–time graph is velocity. A changing gradient means changing velocity.',
  'The gradient of a velocity–time graph is acceleration. The signed area under the graph is displacement.',
  'The area under an acceleration–time graph gives the change in velocity.',
  'Negative values indicate direction relative to the chosen positive direction; they do not automatically mean slowing down.'
 ],
 worked:{q:'Velocity increases uniformly from 4.0 to 16.0 m s⁻¹ in 6.0 s. Find acceleration and displacement.',a:'a = (16−4)/6 = 2.0 m s⁻². Displacement = average velocity × time = (4+16)/2 × 6 = 60 m.'},
 task:'Sketch a velocity–time graph for a car that accelerates from rest for 5 s, travels at constant speed for 8 s, then brakes uniformly to rest in 4 s.',
 check:{q:'What does the gradient of a velocity–time graph give?',choices:['Displacement','Distance','Acceleration','Momentum'],answer:2,explain:'Acceleration is the rate of change of velocity, so it is the gradient of a velocity–time graph.'},
 exit:'A velocity–time graph crosses below the time axis. Explain what this means physically.'
},
{
 id:'suvat', code:'3.4.1.3', title:'SUVAT and free fall', sim:'motion',
 lead:'Choose and apply constant-acceleration equations, including motion under gravity.',
 formulas:['v = u + at','s = ut + ½at²','v² = u² + 2as','s = ½(u+v)t'],
 retrieval:[
  {q:'What does each SUVAT symbol represent?',a:'s displacement, u initial velocity, v final velocity, a acceleration, t time.'},
  {q:'When are SUVAT equations valid?',a:'When acceleration is constant.'},
  {q:'What value is commonly used for g near Earth?',a:'9.81 m s⁻² (or the value specified in the question).'}
 ],
 objectives:['Select the correct SUVAT equation from known quantities.','Use a consistent sign convention.','Model free fall with acceleration g.'],
 core:[
  'SUVAT is a set of relationships for motion with constant acceleration.',
  'Write down the values you know before choosing an equation. Prefer an equation that contains the quantity required and only the known quantities.',
  'Choose a positive direction and keep it throughout the calculation. If upward is positive, gravitational acceleration is −g.',
  'At the highest point of a vertical throw, instantaneous velocity is zero but acceleration is still downward at g.'
 ],
 worked:{q:'A ball is thrown vertically upward at 14.0 m s⁻¹. Find the maximum height above the release point.',a:'Take upward as positive. v = 0, u = 14.0, a = −9.81. v² = u² + 2as gives s = (0−196)/(−19.62) = 9.99 m.'},
 task:'A stone is dropped from rest for 1.50 s. Calculate its speed and distance fallen, ignoring air resistance.',
 check:{q:'At the highest point of a vertical throw, what is the acceleration?',choices:['0','9.81 m s⁻² upward','9.81 m s⁻² downward','It depends on mass'],answer:2,explain:'Velocity is momentarily zero, but gravity still produces downward acceleration.'},
 exit:'State two checks you should make before using a SUVAT equation.'
},
{
 id:'rp3', code:'RP3 / 3.4.1.3', title:'Required Practical 3: determining g', sim:'motion',
 lead:'Plan, process and evaluate a free-fall method for measuring gravitational acceleration.',
 formulas:['h = ½gt²','g = 2h/t²'],
 retrieval:[
  {q:'Why are repeated readings useful?',a:'They allow a mean to reduce the effect of random variation and help identify anomalies.'},
  {q:'Give one possible systematic error in a timing experiment.',a:'Examples include a zero offset, fixed trigger delay, miscalibrated scale or consistent measurement offset.'},
  {q:'What graph can linearise h = ½gt²?',a:'Plot h against t². The gradient is g/2.'}
 ],
 objectives:['Describe a workable free-fall method.','Use a graph to determine g.','Identify random and systematic errors and improvements.'],
 core:[
  'One approach measures fall distance h and time t for a released object, ideally with electronic timing such as light gates or an electromagnet/timer arrangement.',
  'From h = ½gt², a graph of h against t² should be a straight line through the origin with gradient g/2.',
  'Use a wide range of heights, repeat timings and measure distances carefully from consistent reference points.',
  'Random error creates scatter. Systematic error shifts readings in a consistent way and is not removed by repeats.',
  'A strong evaluation links each limitation to its effect on the measured value and then proposes a specific improvement.'
 ],
 worked:{q:'The gradient of a graph of h against t² is 4.88 m s⁻². Determine g.',a:'gradient = g/2, so g = 2 × 4.88 = 9.76 m s⁻².'},
 task:'Open Required Practicals and collect at least five simulated readings at different heights. Calculate a mean g and comment on scatter.',
 check:{q:'For a graph of h against t², what is the gradient?',choices:['g','g/2','2g','1/g'],answer:1,explain:'h = (g/2)t², so the gradient is g/2.'},
 exit:'Explain why measuring a longer fall time generally reduces percentage timing uncertainty.'
},
{
 id:'projectiles', code:'3.4.1.4', title:'Projectile motion, drag and terminal speed', sim:'projectile',
 lead:'Treat horizontal and vertical motion independently and explain the role of resistive forces.',
 formulas:['x = uₓt','vᵧ = uᵧ + gt','sᵧ = uᵧt + ½gt²'],
 retrieval:[
  {q:'What horizontal acceleration acts on an ideal projectile with no air resistance?',a:'Zero.'},
  {q:'What vertical acceleration acts on it?',a:'g downward.'},
  {q:'Why can horizontal and vertical motion be treated separately?',a:'They are perpendicular components; gravity acts vertically, so it does not directly change horizontal velocity in the ideal model.'}
 ],
 objectives:['Solve two-dimensional projectile problems.','Explain how drag changes a trajectory.','Explain terminal speed using changing resultant force.'],
 core:[
  'Projectile motion can be split into independent horizontal and vertical components that share the same time.',
  'Without air resistance, horizontal velocity is constant while vertical velocity changes uniformly because of gravity.',
  'Air resistance acts opposite to motion and increases with speed, so real trajectories are not perfectly symmetric.',
  'For a falling object, drag increases as speed rises. Terminal speed occurs when drag equals weight, making resultant force and acceleration zero.',
  'Lift acts approximately perpendicular to relative airflow; drag acts approximately parallel and opposite to it.'
 ],
 worked:{q:'A ball leaves a table horizontally at 6.0 m s⁻¹ from height 1.25 m. Find the flight time and horizontal range.',a:'Vertical: 1.25 = ½(9.81)t², so t = 0.505 s. Horizontal range = 6.0 × 0.505 = 3.03 m.'},
 task:'Use the projectile simulator to compare launch angles of 20°, 45° and 70° at the same speed. Record range and maximum height.',
 check:{q:'At terminal speed, which statement is correct?',choices:['Weight is zero','Drag is zero','Resultant force is zero','Acceleration equals g'],answer:2,explain:'At terminal speed, drag balances weight, so resultant force and acceleration are zero.'},
 exit:'Explain why the vertical velocity of an ideal horizontal projectile changes while horizontal velocity does not.'
},
{
 id:'newton', code:'3.4.1.5', title:'Newton’s laws and free-body diagrams', sim:'newton',
 lead:'Use Newton’s laws to connect force, acceleration and interactions.',
 formulas:['ΣF = ma','weight = mg'],
 retrieval:[
  {q:'State Newton’s first law in terms of resultant force.',a:'If resultant force is zero, velocity remains constant; this includes remaining at rest.'},
  {q:'Write Newton’s second law for constant mass.',a:'Resultant force = mass × acceleration, ΣF = ma.'},
  {q:'What is special about a Newton’s third-law pair?',a:'The forces are equal in magnitude, opposite in direction, same interaction type and act on different objects.'}
 ],
 objectives:['Apply all three Newton laws.','Draw and use free-body diagrams.','Distinguish balanced forces from third-law pairs.'],
 core:[
  'Newton’s first law describes inertia: an object changes velocity only when there is a resultant force.',
  'For constant mass, Newton’s second law is ΣF = ma. Always use the resultant force, not a single force unless it is the only unbalanced force.',
  'Newton’s third law concerns interactions between two objects: if A exerts a force on B, B simultaneously exerts an equal and opposite force on A.',
  'Third-law pairs act on different objects, so they cannot cancel on one object’s free-body diagram.',
  'A free-body diagram should show only forces acting on the chosen object, with clear directions and labels.'
 ],
 worked:{q:'A 1200 kg car has 3200 N driving force and 800 N total resistance. Find acceleration.',a:'Resultant force = 3200 − 800 = 2400 N. a = 2400/1200 = 2.0 m s⁻².'},
 task:'Draw a free-body diagram for a lift accelerating upward. Label weight, tension and resultant direction, then write an equation for its acceleration.',
 check:{q:'Which statement describes a Newton’s third-law pair?',choices:['Two equal forces on the same object','Weight and normal reaction on one object','Equal opposite forces on two interacting objects','Any two balanced forces'],answer:2,explain:'Third-law forces act on different interacting objects.'},
 exit:'Explain why weight and normal contact force on a stationary book are not a third-law pair.'
},
{
 id:'momentum', code:'3.4.1.6', title:'Momentum, impulse and collisions', sim:'momentum',
 lead:'Use conservation of momentum, impulse and force–time graphs to analyse interactions.',
 formulas:['p = mv','F = Δp/Δt','impulse = FΔt = Δp'],
 retrieval:[
  {q:'Is momentum scalar or vector?',a:'Vector.'},
  {q:'State the principle of conservation of momentum.',a:'Total momentum of a closed system remains constant if no resultant external force acts.'},
  {q:'What does the area under a force–time graph represent?',a:'Impulse, equal to change in momentum.'}
 ],
 objectives:['Calculate momentum and impulse.','Apply momentum conservation in one dimension.','Explain impact-force reduction using contact time.'],
 core:[
  'Momentum p = mv. Because velocity is a vector, signs or directions must be handled consistently.',
  'In an isolated system, total momentum before an interaction equals total momentum after.',
  'Force is the rate of change of momentum. For a fixed change in momentum, increasing collision time reduces average force.',
  'Impulse equals change in momentum and equals the area under a force–time graph, including when force varies with time.',
  'Momentum is conserved in both elastic and inelastic collisions; kinetic energy is conserved only in elastic collisions.'
 ],
 worked:{q:'A 0.20 kg ball moving at +12 m s⁻¹ rebounds at −8.0 m s⁻¹. Find its change in momentum.',a:'Δp = m(v−u) = 0.20(−8−12) = −4.0 kg m s⁻¹. Magnitude of impulse is 4.0 N s.'},
 task:'Two trolleys collide and stick. Use the simulator to test whether total momentum before and after stays constant while kinetic energy changes.',
 check:{q:'A crumple zone reduces injury risk mainly because it…',choices:['reduces change in momentum to zero','increases collision time for a similar Δp','increases acceleration','increases vehicle mass'],answer:1,explain:'Increasing the time for the same momentum change reduces the average force.'},
 exit:'State the difference between an elastic and inelastic collision in terms of kinetic energy.'
},
{
 id:'work', code:'3.4.1.7', title:'Work, energy, power and efficiency', sim:'energy',
 lead:'Calculate energy transfers and interpret force–displacement graphs.',
 formulas:['W = Fs cosθ','P = W/t = Fv','Eₖ = ½mv²','ΔEₚ = mgΔh','efficiency = useful/total'],
 retrieval:[
  {q:'What is work done?',a:'Energy transferred when a force causes displacement.'},
  {q:'What is power?',a:'Rate of energy transfer or rate of doing work.'},
  {q:'What does the area under a force–displacement graph represent?',a:'Work done / energy transferred.'}
 ],
 objectives:['Calculate work done by a force at an angle.','Use kinetic and gravitational potential energy.','Calculate power and efficiency.'],
 core:[
  'For a constant force, work done is the component of force along the displacement multiplied by displacement: W = Fs cosθ.',
  'Kinetic energy is ½mv². Gravitational potential energy change near Earth is mgΔh.',
  'Power is the rate of doing work. At constant speed with force parallel to velocity, P = Fv.',
  'For a varying force, work done is the area under the force–displacement graph.',
  'Efficiency compares useful output energy or power with total input and can be expressed as a fraction or percentage.'
 ],
 worked:{q:'A motor lifts 25 kg vertically through 4.0 m in 5.0 s. Find useful power.',a:'Energy gained = mgh = 25×9.81×4.0 = 981 J. Power = 981/5.0 = 196 W.'},
 task:'A 900 kg car travels at constant 20 m s⁻¹ against 700 N resistance. Calculate the engine power transferred to overcome resistance.',
 check:{q:'If speed doubles, kinetic energy becomes…',choices:['twice as large','three times as large','four times as large','unchanged'],answer:2,explain:'Kinetic energy is proportional to v².'},
 exit:'Explain why the area under a force–displacement graph is energy transferred.'
},
{
 id:'energy', code:'3.4.1.8', title:'Conservation of energy', sim:'energy',
 lead:'Track energy transfers through mechanical systems, including work against resistive forces.',
 formulas:['Einitial = Efinal + dissipated energy','½mv² + mgh = constant (ideal mechanical system)'],
 retrieval:[
  {q:'State the principle of conservation of energy.',a:'Energy cannot be created or destroyed; it is transferred between stores or dissipated to the surroundings.'},
  {q:'What happens to mechanical energy when resistive forces do work?',a:'Some is transferred to internal/thermal energy of the system and surroundings.'},
  {q:'Can total energy decrease?',a:'No for a closed system; useful mechanical energy can decrease while energy is transferred elsewhere.'}
 ],
 objectives:['Apply energy conservation quantitatively.','Include dissipated energy in calculations.','Compare energy and force methods.'],
 core:[
  'Choose a system boundary, identify initial and final energy stores and account for transfers across the boundary.',
  'In an ideal frictionless system, loss of gravitational potential energy can equal gain in kinetic energy.',
  'With resistive forces, some mechanical energy is dissipated. The work done against resistance is an energy transfer.',
  'Energy methods are often efficient when time is not involved and the route between initial and final states is unimportant.'
 ],
 worked:{q:'A 2.0 kg object falls 5.0 m from rest and loses 18 J to air resistance. Find its kinetic energy just before impact.',a:'GPE lost = 2.0×9.81×5.0 = 98.1 J. KE = 98.1−18 = 80.1 J.'},
 task:'Use the energy simulator to compare an ideal track with a dissipative track. Explain the change in kinetic and gravitational stores.',
 check:{q:'With friction present, which is conserved?',choices:['Kinetic energy only','Mechanical energy only','Total energy','Gravitational potential energy'],answer:2,explain:'Total energy is conserved; mechanical energy can be transferred to internal energy.'},
 exit:'Give one reason an energy method may be simpler than using SUVAT and Newton’s laws.'
},
{
 id:'density-hooke', code:'3.4.2.1', title:'Density, Hooke’s law and elastic limit', sim:'density',
 lead:'Move from mechanics into material behaviour by relating force to deformation.',
 formulas:['ρ = m/V','F = kΔL'],
 retrieval:[
  {q:'Define density.',a:'Mass per unit volume.'},
  {q:'State Hooke’s law.',a:'Extension is proportional to applied force provided the limit of proportionality is not exceeded; equivalently F = kΔL in the linear region.'},
  {q:'What is spring constant?',a:'Force per unit extension; a measure of stiffness for a spring.'}
 ],
 objectives:['Calculate density.','Use F = kΔL.','Distinguish limit of proportionality from elastic behaviour.'],
 core:[
  'Density is ρ = m/V with SI unit kg m⁻³.',
  'For a Hookean spring, force and extension are proportional, producing a straight-line force–extension graph through the origin.',
  'Spring constant k is the gradient of a force–extension graph when force is plotted vertically against extension.',
  'The limit of proportionality is where the graph stops being linear. The elastic limit is the greatest load for which the object returns to its original shape after unloading.'
 ],
 worked:{q:'A spring extends 24 mm under a 6.0 N load. Find k while behaviour is Hookean.',a:'ΔL = 0.024 m. k = F/ΔL = 6.0/0.024 = 250 N m⁻¹.'},
 task:'Use the elasticity simulation to increase force gradually. Identify the linear region and estimate the spring constant from two readings.',
 check:{q:'What is the gradient of a force against extension graph in the linear region?',choices:['1/k','k','elastic energy','stress'],answer:1,explain:'F = kΔL, so plotting F against ΔL gives gradient k.'},
 exit:'Explain why “elastic” and “linear/Hookean” are not exactly the same idea.'
},
{
 id:'stress-strain', code:'3.4.2.1', title:'Stress, strain and elastic strain energy', sim:'elasticity',
 lead:'Use stress and strain to compare materials independently of sample dimensions.',
 formulas:['stress = F/A','strain = ΔL/L','Eelastic = ½FΔL'],
 retrieval:[
  {q:'What are the SI units of stress?',a:'Pa, equivalent to N m⁻².'},
  {q:'Does strain have a unit?',a:'No. It is a ratio of two lengths.'},
  {q:'What does elastic strain energy represent?',a:'Energy stored due to elastic deformation.'}
 ],
 objectives:['Calculate tensile stress and strain.','Calculate elastic strain energy.','Explain why stress and strain are useful material quantities.'],
 core:[
  'Tensile stress is force divided by original cross-sectional area.',
  'Tensile strain is extension divided by original length and is dimensionless.',
  'Stress and strain remove much of the effect of sample geometry, allowing materials to be compared.',
  'For a linear force–extension graph, elastic strain energy is the triangular area under the graph: ½FΔL.',
  'For any force–extension graph, energy transferred in deformation is the area under the graph.'
 ],
 worked:{q:'A wire of area 2.0×10⁻⁷ m² carries 60 N. Find tensile stress.',a:'stress = 60/(2.0×10⁻⁷) = 3.0×10⁸ Pa.'},
 task:'A 2.0 m wire extends by 1.2 mm under tension. Calculate strain, then explain why this is a pure number.',
 check:{q:'Which quantity is dimensionless?',choices:['Stress','Strain','Young modulus','Spring constant'],answer:1,explain:'Strain is extension divided by original length, so the units cancel.'},
 exit:'Explain the difference between a force–extension graph and a stress–strain graph.'
},
{
 id:'material-behaviour', code:'3.4.2.1', title:'Stress–strain curves and material behaviour', sim:'elasticity',
 lead:'Interpret elastic, plastic, brittle and fracture behaviour from graphs.',
 formulas:['breaking stress = breaking force / area'],
 retrieval:[
  {q:'What is plastic deformation?',a:'Permanent deformation that remains after the load is removed.'},
  {q:'What is brittle behaviour?',a:'Fracture with little plastic deformation.'},
  {q:'What does the area under a force–extension graph represent?',a:'Energy transferred in deformation.'}
 ],
 objectives:['Interpret stress–strain and force–extension curves.','Distinguish elastic, plastic and brittle behaviour.','Identify breaking stress.'],
 core:[
  'In the initial linear region, stress is proportional to strain and the material follows Hooke-like behaviour.',
  'If unloading after elastic deformation, the sample returns to its original length.',
  'Plastic deformation leaves permanent extension after the load is removed.',
  'Brittle materials fracture after relatively little plastic deformation. Ductile materials can undergo substantial plastic deformation before fracture.',
  'Breaking stress is the tensile stress at fracture and should not be confused with breaking force, which depends on cross-sectional area.'
 ],
 worked:{q:'Two wires of the same material have different diameters. Which has the same breaking stress?',a:'Both, ideally, because breaking stress is a material property. The thicker wire has a larger breaking force because its cross-sectional area is larger.'},
 task:'Sketch qualitative stress–strain curves for a brittle material and a ductile metal. Label the elastic region and fracture point.',
 check:{q:'Which statement best describes plastic deformation?',choices:['It always obeys Hooke’s law','It is fully reversed when unloaded','It leaves permanent deformation','It means the material must fracture immediately'],answer:2,explain:'Plastic deformation remains after unloading.'},
 exit:'Explain why stress is more useful than breaking force when comparing different samples of the same material.'
},
{
 id:'young', code:'3.4.2.2', title:'Young modulus', sim:'elasticity',
 lead:'Quantify material stiffness using the ratio of tensile stress to tensile strain.',
 formulas:['E = stress/strain','E = FL/(AΔL)'],
 retrieval:[
  {q:'Define Young modulus.',a:'Tensile stress divided by tensile strain in the linear elastic region.'},
  {q:'What are the units of Young modulus?',a:'Pa.'},
  {q:'What does a larger Young modulus imply?',a:'The material is stiffer: more stress is needed for the same strain.'}
 ],
 objectives:['Calculate Young modulus.','Find Young modulus from a stress–strain graph.','Relate stiffness to material rather than specimen dimensions.'],
 core:[
  'Young modulus E = tensile stress / tensile strain while the material is in its linear elastic region.',
  'Because stress is measured in pascals and strain has no units, Young modulus is also measured in pascals.',
  'On a stress–strain graph, Young modulus is the gradient of the initial straight-line section.',
  'A high Young modulus means a stiff material. It does not directly mean the material is strong; strength relates to the stress required for yielding or fracture.'
 ],
 worked:{q:'A wire experiences stress 1.6×10⁸ Pa at strain 8.0×10⁻⁴. Find E.',a:'E = 1.6×10⁸ / 8.0×10⁻⁴ = 2.0×10¹¹ Pa.'},
 task:'Use the elasticity simulator to compare two materials with different Young moduli. Describe the effect on strain for the same stress.',
 check:{q:'On a stress–strain graph, Young modulus is…',choices:['area under graph','gradient of initial linear region','breaking stress','inverse of strain'],answer:1,explain:'Young modulus is stress/strain, so it is the gradient when stress is plotted against strain.'},
 exit:'Explain why a stiff material is not necessarily a strong material.'
},
{
 id:'rp4', code:'RP4 / 3.4.2.2', title:'Required Practical 4: Young modulus', sim:'elasticity',
 lead:'Plan, process and evaluate a simple Young modulus measurement.',
 formulas:['E = FL/(AΔL)','A = πd²/4'],
 retrieval:[
  {q:'Why measure wire diameter in several orientations/positions?',a:'To reduce random uncertainty and account for non-uniform diameter; use a mean.'},
  {q:'Why must diameter be measured accurately?',a:'Area depends on diameter squared, so diameter uncertainty has a strong effect on calculated area and Young modulus.'},
  {q:'What graph can be used?',a:'Force against extension (gradient k for the sample) or stress against strain (gradient E).'}
 ],
 objectives:['Describe a simple Young modulus method.','Process diameter, length, force and extension measurements.','Evaluate uncertainty and safety.'],
 core:[
  'Measure original wire length between fixed reference points and determine wire diameter with a micrometer at several positions.',
  'Add known loads gradually and measure extension while remaining in the elastic/linear region.',
  'Convert mass to force using F = mg. Calculate cross-sectional area from diameter and then use E = FL/(AΔL).',
  'A long thin wire gives a larger extension for a given force, which can reduce percentage uncertainty in extension.',
  'The major practical risks are from a snapping wire or falling masses, so the real experiment requires appropriate eye protection, secure apparatus and a clear load area.'
 ],
 worked:{q:'A 1.50 m wire of diameter 0.40 mm extends 1.8 mm under 30 N. Estimate E.',a:'A = π(0.00040)²/4 = 1.26×10⁻⁷ m². E = 30×1.50 /(1.26×10⁻⁷×0.0018) ≈ 2.0×10¹¹ Pa.'},
 task:'Open Required Practicals, collect at least five simulated readings and compare the calculated Young modulus across the data set.',
 check:{q:'Why does diameter uncertainty matter strongly?',choices:['Force is proportional to diameter','Area is proportional to d²','Strain is proportional to d','Length is proportional to d²'],answer:1,explain:'Cross-sectional area is πd²/4, so uncertainty in d is amplified in area.'},
 exit:'Suggest two practical changes that would reduce percentage uncertainty in Young modulus.'
},
{
 id:'mastery', code:'3.4 synthesis', title:'Mechanics mastery and synoptic problems', sim:'energy',
 lead:'Combine multiple ideas in the style of longer AQA mechanics questions.',
 formulas:['ΣF = ma','p = mv','Eₖ = ½mv²','W = Fs','SUVAT as appropriate'],
 retrieval:[
  {q:'Name three conservation principles or conditions used in this topic.',a:'Examples: conservation of momentum, conservation of energy, equilibrium/resultant force zero, principle of moments.'},
  {q:'What is a good first step in a mechanics problem?',a:'Define the system/direction, draw a diagram or free-body diagram and list known quantities.'},
  {q:'How should final numerical answers be presented?',a:'With sensible significant figures and correct units, plus direction where required.'}
 ],
 objectives:['Select between force, energy and momentum approaches.','Link graphs, equations and physical explanations.','Use clear AQA-style reasoning in extended problems.'],
 core:[
  'Mechanics problems rarely announce which equation to use. Decide what is conserved or what changes between the stated initial and final conditions.',
  'Use force/Newton methods when acceleration or interactions are central; energy methods when comparing states without needing time; momentum methods for short collisions/explosions.',
  'Draw free-body diagrams carefully and keep signs consistent. Check whether acceleration is actually constant before using SUVAT.',
  'For unfamiliar contexts, identify the same underlying physics rather than searching for a memorised scenario.',
  'After calculating, check magnitude, dimensions/units and physical plausibility.'
 ],
 worked:{q:'A 0.50 kg trolley moving at 4.0 m s⁻¹ collides and sticks to a 1.0 kg stationary trolley. Find their speed, then the kinetic energy lost.',a:'Momentum: 0.50×4.0 = 1.50v, so v = 1.33 m s⁻¹. Initial KE = 4.0 J. Final KE = ½×1.50×1.33² ≈ 1.33 J. Lost ≈ 2.67 J.'},
 task:'Create a solution map for a problem involving a car accelerating down a slope, then colliding with a barrier. Identify where vectors, Newton’s laws, energy and momentum would each be useful.',
 check:{q:'Which method is usually most direct for a short collision when external impulse is negligible?',choices:['Conservation of momentum','Young modulus','Principle of moments only','Density'],answer:0,explain:'Momentum conservation is the core tool for short interactions when external impulse is negligible.'},
 exit:'Write a five-step checklist you will use for any unfamiliar A-level mechanics calculation.'
}
];


const lessonExtensions = {
 vectors:{
  keyTerms:[['scalar','A physical quantity with magnitude only.'],['vector','A physical quantity with magnitude and direction.'],['resultant','A single vector with the same effect as two or more vectors combined.'],['displacement','Straight-line change of position in a stated direction.']],
  depth:[
   'AQA expects students to distinguish paired scalar/vector quantities, including speed and velocity, distance and displacement, mass and weight, and to recognise acceleration and force as vectors.',
   'Vector addition can be carried out by calculation or by a scale drawing. Calculations in this part of the specification are limited to two vectors at right angles, although scale drawings can use other angles.',
   'When using a scale diagram, state the scale, draw arrows accurately head-to-tail, measure the resultant from the start of the first vector to the end of the last, and quote both magnitude and direction.',
   'For perpendicular components, Pythagoras gives the resultant magnitude. A trigonometric ratio then gives the direction; always state the reference direction, for example 37° north of east.',
   'A negative component does not mean a negative magnitude: it means the component points opposite to the chosen positive direction.'
  ],
  exam:['Write vector answers with both magnitude and direction.','Show the component triangle or equations before calculating.','Check whether the question wants distance or displacement, speed or velocity.'],
  pitfalls:['Giving only the magnitude of a resultant vector.','Adding vector magnitudes arithmetically when directions differ.']
 },
 resolution:{
  keyTerms:[['component','One of the perpendicular vectors into which a vector is resolved.'],['equilibrium','Zero resultant force; acceleration is zero.'],['coplanar','Acting in the same plane.'],['closed triangle','Three force vectors arranged head-to-tail and returning to the start when in equilibrium.']],
  depth:[
   'Resolving means replacing one vector by perpendicular components that together have exactly the same effect.',
   'If an angle is measured from the horizontal, the adjacent horizontal component is F cosθ and the vertical component is F sinθ. If the angle is measured from another axis, identify adjacent and opposite rather than memorising a diagram.',
   'For an inclined plane, choosing axes parallel and perpendicular to the slope usually simplifies the problem. Weight resolves to mg sinθ down the slope and mg cosθ perpendicular to the slope.',
   'For two or three coplanar forces acting at a point in equilibrium, the vector sum is zero. Equilibrium can mean stationary or moving with constant velocity.',
   'A three-force equilibrium can be solved using components or represented by a closed vector triangle.'
  ],
  exam:['Draw a free-body diagram before resolving.','State the positive direction and keep signs consistent.','For equilibrium write ΣFₓ = 0 and ΣFᵧ = 0 explicitly when useful.'],
  pitfalls:['Assuming equilibrium means the object must be stationary.','Using mg cosθ and mg sinθ without checking how θ is defined.']
 },
 moments:{
  keyTerms:[['moment','Turning effect of a force about a point: force × perpendicular distance.'],['line of action','An imaginary straight line through a force in its direction.'],['couple','Two equal, opposite, parallel forces acting along different lines.'],['centre of mass','Point at which the mass of a body may be considered concentrated for translational motion.']],
  depth:[
   'The perpendicular distance in M = Fd is the shortest distance from the pivot to the line of action of the force.',
   'A couple has zero resultant force but a non-zero turning effect. Its moment is one force multiplied by the perpendicular separation of the two lines of action.',
   'For rotational equilibrium, the algebraic sum of moments about any point is zero. In many questions this is expressed as total clockwise moment equals total anticlockwise moment.',
   'The centre of mass of a uniform regular solid lies at its geometric centre. Weight can be treated as acting vertically downward through the centre of mass.',
   'Choosing the pivot strategically can eliminate unknown forces whose lines of action pass through that pivot.'
  ],
  exam:['Mark the pivot and perpendicular distances on the diagram.','Use N m for moments, not J even though the dimensions are the same.','If several forces act, include every force that has a non-zero moment about the chosen pivot.'],
  pitfalls:['Using the sloping distance instead of the perpendicular distance.','Treating the two forces in a couple as cancelling their turning effect.']
 },
 kinematics:{
  keyTerms:[['average velocity','Total displacement divided by total time.'],['instantaneous velocity','Velocity at a particular instant.'],['acceleration','Rate of change of velocity.'],['gradient','Rate of change of the vertical quantity with respect to the horizontal quantity.']],
  depth:[
   'The gradient of a displacement–time graph is velocity. A tangent gives instantaneous velocity on a curved graph.',
   'The gradient of a velocity–time graph is acceleration. A tangent gives instantaneous acceleration when the graph is curved.',
   'The signed area under a velocity–time graph is displacement. Areas below the time axis count as negative displacement.',
   'The signed area under an acceleration–time graph gives change in velocity, not displacement.',
   'Uniform acceleration produces a straight line on a velocity–time graph. Non-uniform acceleration produces a changing gradient.',
   'AQA can use unfamiliar graphs such as a bouncing ball. Interpret each region physically rather than relying on the appearance alone.'
  ],
  exam:['Put units on every gradient or area result.','Use a tangent for an instantaneous gradient and a sufficiently large triangle.','Distinguish distance from displacement when velocity becomes negative.'],
  pitfalls:['Saying area under a velocity–time graph is always distance.','Confusing the gradient of a displacement–time graph with acceleration.']
 },
 suvat:{
  keyTerms:[['uniform acceleration','Acceleration that remains constant.'],['free fall','Motion under gravity alone in the idealised model.'],['g','Magnitude of gravitational field acceleration near Earth, approximately 9.81 m s⁻².'],['sign convention','A chosen positive direction used consistently in vector equations.']],
  depth:[
   'The SUVAT equations apply only when acceleration is constant over the interval considered.',
   'List s, u, v, a and t before selecting an equation. Choose an equation containing the required quantity and the values you know.',
   'Gravity acts downward. If upward is positive, a = −g; if downward is positive, a = +g.',
   'At the top of a vertical throw, velocity is instantaneously zero but acceleration remains g downward.',
   'Free-fall questions may combine graph interpretation and SUVAT. Check whether air resistance can be neglected before treating acceleration as constant g.'
  ],
  exam:['State the sign convention before substitution in multi-stage problems.','Do not round intermediate values too early.','Check the final sign and whether the magnitude is physically sensible.'],
  pitfalls:['Setting acceleration to zero at maximum height.','Using SUVAT while acceleration is changing because of significant drag.']
 },
 rp3:{
  keyTerms:[['random error','Unpredictable variation that causes scatter between repeated readings.'],['systematic error','A consistent offset or bias that shifts readings in the same direction.'],['uncertainty','A quantitative estimate of the range within which a measured value is expected to lie.'],['linearisation','Rearranging a relationship so a graph of chosen variables should be a straight line.']],
  depth:[
   'AQA Required Practical 3 is determination of g by a free-fall method. The exact apparatus can vary, but the method must produce a measured displacement and corresponding fall time.',
   'For release from rest with negligible air resistance, h = ½gt². A plot of h against t² should have gradient g/2, so g = 2 × gradient.',
   'Electronic timing such as light gates reduces reaction-time error. Distances should be measured from consistent reference points and over a useful range.',
   'Repeat readings to identify anomalies and reduce random uncertainty in mean values. Repetition does not remove a systematic offset.',
   'A strong evaluation identifies a specific source of error, explains its effect on h, t or g, and proposes a realistic improvement.',
   'The AQA practical skills include identifying random and systematic errors and determining g from a graph.'
  ],
  exam:['Describe how the gradient leads to g rather than just saying “use a graph”.','Separate random uncertainty from systematic error.','For percentage uncertainty, compare absolute uncertainty with the measured value.'],
  pitfalls:['Averaging values of g without considering whether a graph would use all data more effectively.','Claiming repeats remove systematic error.']
 },
 projectiles:{
  keyTerms:[['projectile','An object moving through a gravitational field after launch, with no continuing propulsion in the ideal model.'],['drag','Resistive force opposite relative motion through a fluid.'],['lift','Force approximately perpendicular to relative fluid flow.'],['terminal speed','Constant speed reached when resistive force balances the driving force such as weight.']],
  depth:[
   'Horizontal and vertical components of ideal projectile motion are independent but share the same time.',
   'With negligible air resistance, horizontal acceleration is zero and horizontal velocity is constant. Vertical acceleration is g downward.',
   'Resolve the launch velocity first: uₓ = u cosθ and uᵧ = u sinθ when θ is measured above the horizontal.',
   'Air resistance increases with speed and changes both components of velocity, giving a lower, shorter and generally non-symmetric trajectory than the vacuum model.',
   'For a falling body, drag increases as speed increases. Terminal speed occurs when drag equals weight, so resultant force and acceleration are zero.',
   'AQA requires qualitative treatment of friction, lift and drag and qualitative understanding of factors affecting the maximum speed of a vehicle.'
  ],
  exam:['Treat horizontal and vertical motion in separate columns and link them with time.','State when air resistance is neglected.','Use force balance, not “no forces”, to explain terminal speed.'],
  pitfalls:['Assuming acceleration is zero at the top of a projectile path.','Assuming terminal speed means weight has disappeared.']
 },
 newton:{
  keyTerms:[['inertia','Tendency of an object to maintain its velocity unless acted on by a resultant force.'],['resultant force','Vector sum of all forces acting on one object.'],['free-body diagram','Diagram showing only the external forces acting on the chosen object.'],['third-law pair','Equal and opposite forces of the same interaction acting on different objects.']],
  depth:[
   'Newton’s first law: if the resultant force is zero, an object remains at rest or continues with constant velocity.',
   'For constant mass, Newton’s second law is ΣF = ma. The acceleration is in the direction of the resultant force.',
   'Newton’s third law applies to interactions: if object A exerts a force on B, B exerts an equal and opposite force on A.',
   'Third-law pairs act on different objects and therefore do not cancel on a single free-body diagram.',
   'Free-body diagrams should show forces, not motion arrows. Typical forces include weight, normal contact force, tension, thrust, friction and drag.',
   'On a slope or in connected-body problems, resolve forces along convenient axes before applying ΣF = ma.'
  ],
  exam:['Write an equation from the free-body diagram before inserting numbers.','Name both objects when explaining a Newton III pair.','Use resultant force, not total force magnitude.'],
  pitfalls:['Calling weight and normal reaction on the same object a third-law pair.','Including forces exerted by the object rather than forces acting on it.']
 },
 momentum:{
  keyTerms:[['momentum','Vector quantity p = mv.'],['impulse','Change in momentum; for constant force J = FΔt.'],['closed system','System with negligible resultant external impulse during the interaction.'],['elastic collision','Collision in which total kinetic energy as well as momentum is conserved.']],
  depth:[
   'Linear momentum is conserved when the resultant external force on the system is negligible over the interaction time.',
   'In one-dimensional calculations, choose a positive direction and give velocities signs. Momentum before equals momentum after.',
   'Force is the rate of change of momentum, F = Δp/Δt for average force and F = dp/dt conceptually.',
   'The area under a force–time graph is impulse, equal to change in momentum. This remains valid when force varies with time.',
   'Increasing the contact time for a given momentum change reduces the average impact force. This explains features such as crumple zones and protective packaging.',
   'Momentum is conserved in elastic and inelastic collisions and in explosions. Kinetic energy is conserved only in elastic collisions.'
  ],
  exam:['Define the system before applying momentum conservation.','Keep velocity signs throughout instead of adding directions afterwards.','For force–time graphs, calculate the actual geometric area.'],
  pitfalls:['Assuming momentum conservation means kinetic energy is conserved.','Using speed rather than signed velocity in a one-dimensional collision.']
 },
 work:{
  keyTerms:[['work done','Energy transferred by a force acting through a displacement.'],['power','Rate of doing work or transferring energy.'],['efficiency','Useful output energy or power divided by total input energy or power.'],['variable force','A force whose magnitude changes with displacement.']],
  depth:[
   'For a constant force at angle θ to the displacement, W = Fs cosθ. Only the component parallel to displacement transfers energy by mechanical work.',
   'Kinetic energy is Eₖ = ½mv² and near Earth gravitational potential energy change is ΔEₚ = mgΔh.',
   'Power P = W/t. If a constant force acts parallel to the velocity, P = Fv.',
   'For a variable force, work done is the area under a force–displacement graph.',
   'Efficiency = useful output / total input and may be expressed as a decimal or percentage.',
   'The specification includes practical opportunities such as investigating the efficiency of an electric motor lifting a mass; students should be able to discuss random and systematic errors.'
  ],
  exam:['If force is angled, use the parallel component.','For graph questions, label the area that represents work.','State whether efficiency is a fraction or percentage and keep numerator/denominator consistent.'],
  pitfalls:['Using W = Fs when force is not parallel to displacement.','Using the area under a force–time graph for work; that area is impulse.']
 },
 energy:{
  keyTerms:[['conservation of energy','Total energy of a closed system remains constant.'],['dissipation','Transfer of energy into less useful stores, often internal energy of surroundings.'],['resistive force','Force opposing motion and transferring mechanical energy.'],['mechanical energy','Sum of kinetic and potential energies in the chosen mechanical model.']],
  depth:[
   'Total energy is conserved even when mechanical energy decreases. Resistive forces transfer energy to internal stores and the surroundings.',
   'For changes involving height and speed, write an energy balance such as initial GPE + initial KE = final GPE + final KE + energy dissipated.',
   'Work done against a resistive force is an energy transfer and must be included in the balance.',
   'Energy methods can be quicker than force-and-acceleration methods when only initial and final states matter.',
   'AQA expects both quantitative and qualitative applications involving GPE, KE and work done against resistive forces.'
  ],
  exam:['Define the system and identify all relevant stores/transfers.','Do not say energy is “lost”; say where it is transferred.','Check that both sides of an energy equation have units of joules.'],
  pitfalls:['Assuming kinetic plus GPE is always conserved when resistive forces act.','Confusing conservation of energy with conservation of momentum.']
 },
 'density-hooke':{
  keyTerms:[['density','Mass per unit volume, ρ = m/V.'],['Hooke’s law','Extension is proportional to applied force up to the limit of proportionality.'],['spring constant','Stiffness k = F/ΔL in the linear region.'],['elastic limit','Largest deformation for which the object returns to its original shape when unloaded.']],
  depth:[
   'Density links a bulk sample’s mass and volume. Use SI units kg and m³ to obtain kg m⁻³.',
   'For a Hookean spring or wire, F = kΔL while force is proportional to extension. The gradient of a force–extension graph is k.',
   'The limit of proportionality is the end of the straight-line F–extension region. The elastic limit concerns whether permanent deformation remains after unloading; these ideas are related but not identical.',
   'Elastic strain energy is the area under a force–extension graph. In the linear region E = ½FΔL = ½k(ΔL)².',
   'Spring energy can transform into kinetic or gravitational potential energy, so energy conservation can connect materials and mechanics.'
  ],
  exam:['Convert cm³ or mm³ to m³ before density calculations.','Use extension, not total length, in Hooke’s law.','For non-linear force–extension graphs, use area rather than ½FΔL unless justified.'],
  pitfalls:['Treating the elastic limit and limit of proportionality as exact synonyms.','Using original length in F = kΔL.']
 },
 'stress-strain':{
  keyTerms:[['tensile stress','Force divided by cross-sectional area, σ = F/A.'],['tensile strain','Extension divided by original length, ε = ΔL/L.'],['breaking stress','Stress at which the material fractures.'],['elastic strain energy','Energy stored during elastic deformation.']],
  depth:[
   'Stress allows forces on different-sized samples to be compared by dividing by cross-sectional area. Unit: pascal, Pa.',
   'Strain compares extension with original length and has no unit because it is a ratio of lengths.',
   'The area under a force–extension graph is the work done deforming that particular sample.',
   'For a linearly elastic material, elastic strain energy = ½FΔL. If unloading occurs within the elastic region, this stored energy can be returned.',
   'Breaking stress describes the stress at fracture. It is a material property only when test conditions and material state are appropriately controlled.'
  ],
  exam:['Convert diameter to area using A = πd²/4.','Write strain as a decimal rather than attaching a unit.','Keep sample-level force–extension ideas separate from material-level stress–strain ideas.'],
  pitfalls:['Using diameter directly as area.','Giving strain in metres or percent without noticing what the question requests.']
 },
 'material-behaviour':{
  keyTerms:[['plastic behaviour','Deformation that remains after the force is removed.'],['brittle','Fractures with little or no plastic deformation.'],['fracture','Physical breaking of the material.'],['yield','Onset of substantial plastic deformation in a ductile material.']],
  depth:[
   'A straight initial stress–strain region indicates stress proportional to strain. If unloading occurs in this region, the material returns to its original dimensions.',
   'Beyond the elastic region, a ductile material may deform plastically, so extension remains after unloading.',
   'Brittle materials fracture after relatively little plastic deformation; their stress–strain curves are therefore much shorter in the strain direction.',
   'The area under a stress–strain curve represents energy transferred per unit volume during deformation.',
   'Force–extension curves depend on sample dimensions as well as material, whereas stress–strain curves allow more direct comparison of material behaviour.'
  ],
  exam:['Use graph shape and labelled regions rather than memorised adjectives alone.','Distinguish stiffness (Young modulus) from strength (stress before failure).','When comparing materials, state which graph feature supports the comparison.'],
  pitfalls:['Calling a high Young modulus material “strong” without evidence about breaking stress.','Assuming a ductile material must have a larger Young modulus.']
 },
 young:{
  keyTerms:[['Young modulus','Ratio of tensile stress to tensile strain in the linear elastic region.'],['stiffness','Resistance to elastic deformation; larger E means more stress is needed for the same strain.'],['cross-sectional area','Area normal to the tensile force.'],['linear elastic region','Region where stress is proportional to strain and deformation is recoverable.']],
  depth:[
   'Young modulus E = stress/strain = FL/(AΔL) in the linear elastic region.',
   'On a stress–strain graph, Young modulus is the gradient of the initial straight-line section.',
   'Young modulus is a property of the material, whereas spring constant k depends on the material and the dimensions of the sample.',
   'For a wire, increasing length increases extension for the same stress; increasing cross-sectional area decreases extension for the same force.',
   'Because strain is dimensionless, Young modulus has the same unit as stress: Pa.'
  ],
  exam:['Use original length L and extension ΔL as different quantities.','Convert mm² to m² and mm to m before substitution.','Take the gradient only from the linear elastic region.'],
  pitfalls:['Using the gradient of a force–extension graph as Young modulus directly.','Forgetting area is based on diameter squared.']
 },
 rp4:{
  keyTerms:[['micrometer','Instrument suited to measuring small diameters accurately.'],['reference wire','Wire used in some methods to compensate for support or temperature changes.'],['gradient method','Using a best-fit graph to determine a proportionality constant.'],['percentage uncertainty','Absolute uncertainty divided by measured value × 100%.']],
  depth:[
   'AQA Required Practical 4 is determination of Young modulus by a simple method. A common approach measures original wire length, diameter, load and extension.',
   'Measure diameter at several positions and orientations because wire thickness may vary; use the mean diameter to calculate A = πd²/4.',
   'Load is converted to force using F = mg. Extension is the change in length produced by the load, not the final length.',
   'A graph can be used to reduce the influence of random scatter. For example, plotting stress against strain gives Young modulus as the gradient in the linear region.',
   'Keep within the elastic region so the wire returns to its original length and the Young modulus relationship is valid.',
   'Uncertainty in diameter is especially important because cross-sectional area depends on d².'
  ],
  exam:['Describe exactly how extension is measured and how parallax is reduced.','Explain why multiple diameter readings are taken.','Link the graph gradient to E with units.'],
  pitfalls:['Loading beyond the elastic region and still applying the linear Young modulus model.','Ignoring the squared dependence of area on diameter uncertainty.']
 },
 mastery:{
  keyTerms:[['model selection','Choosing the physics principle that most directly links known and unknown quantities.'],['system','The objects included when applying conservation laws.'],['dimensional check','Checking that equation terms and final answers have compatible units.'],['limiting case','Testing whether a result behaves sensibly when a variable becomes very small, large or zero.']],
  depth:[
   'Mechanics problems often combine several ideas. Start with a diagram, define the system and choose axes before choosing equations.',
   'Use force methods when acceleration or interactions during motion matter; use energy methods when comparing states; use momentum for short interactions; use moments for rotational equilibrium.',
   'Conservation laws require clear system boundaries. External work or impulse can prevent the simple conservation equation from applying to the chosen subsystem.',
   'Graphs may encode the required quantity as a gradient or area. Always identify the physical units of that gradient or area.',
   'A complete A-level solution includes a model assumption, symbolic relationship, substitution with units, numerical answer and physical interpretation.'
  ],
  exam:['Write the governing principle before calculation.','Keep enough significant figures until the final line.','Use a reasonableness check and identify assumptions such as negligible drag or constant acceleration.'],
  pitfalls:['Trying SUVAT automatically without checking acceleration is constant.','Mixing scalar energy equations and vector momentum/force equations without a consistent direction convention.']
 }
};
lessons.forEach(l=>Object.assign(l, lessonExtensions[l.id] || {}));



const lessonDeepening = {
 vectors:{
  connections:[
   'Scale-vector drawings are still examinable even though perpendicular vectors can be calculated. A measured vector answer should include a sensible scale and direction.',
   'Force, velocity, acceleration and displacement are vectors because their direction changes the physical situation; energy, mass, time and speed are scalars.',
   'A vector can be moved parallel to itself on a diagram without changing the vector, provided its magnitude and direction are unchanged.'
  ],
  worked2:{q:'Two perpendicular forces of 24 N east and 10 N north act at a point. Find the resultant.',a:'R = √(24²+10²) = 26 N. Direction = tan⁻¹(10/24) = 22.6° north of east.'}
 },
 resolution:{
  connections:[
   'For an object on an inclined plane, resolving parallel/perpendicular to the plane normally eliminates the need to resolve the normal contact force.',
   'Three-force equilibrium can be solved either by components or a closed vector triangle; both methods describe the same zero-resultant condition.',
   'Constant velocity is an equilibrium state because acceleration is zero even though the object is moving.'
  ],
  worked2:{q:'A 12 kg block rests on a smooth 25° slope. Find the component of weight down the slope.',a:'W = mg = 117.7 N. Parallel component = mg sin25° = 49.7 N down the slope.'}
 },
 moments:{
  connections:[
   'A couple produces rotation without translation because its two equal and opposite forces give zero resultant force but a non-zero net moment.',
   'For a uniform regular solid, the centre of mass lies at its geometric centre. Stability depends on whether the line of action of weight stays within the base.',
   'When solving equilibrium problems, choosing the pivot through an unknown reaction force can remove that unknown from the moment equation.'
  ],
  worked2:{q:'A couple consists of two 18 N forces separated by 0.30 m. Find the moment of the couple.',a:'Couple moment = F × separation = 18 × 0.30 = 5.4 N m.'}
 },
 kinematics:{
  connections:[
   'A bouncing-ball graph is a useful test of whether you understand sign: velocity changes suddenly during the collision, while between bounces acceleration is approximately constant at −g if upward is positive.',
   'A curved displacement–time graph has changing velocity; the tangent gradient gives instantaneous velocity.',
   'Area under an acceleration–time graph gives change in velocity, so adding that area to the initial velocity gives final velocity.'
  ],
  worked2:{q:'A velocity–time graph is a triangle from 0 to 12 m s⁻¹ over 5.0 s. Find the displacement.',a:'Displacement = area = ½ × 5.0 × 12 = 30 m.'}
 },
 suvat:{
  connections:[
   'SUVAT is a model: it is only valid over an interval where acceleration is constant.',
   'If motion changes in stages, solve each stage separately and carry the final velocity from one stage into the next.',
   'For free fall near Earth with negligible air resistance, acceleration is independent of mass.'
  ],
  worked2:{q:'A car at 8.0 m s⁻¹ accelerates uniformly at 3.0 m s⁻² over 20 m. Find its final speed.',a:'v²=u²+2as = 8² + 2×3×20 = 184, so v = 13.6 m s⁻¹.'}
 },
 rp3:{
  connections:[
   'A best-fit gradient usually uses the whole trend more effectively than averaging separately calculated values of g.',
   'A non-zero intercept can indicate a systematic offset in distance or timing, depending on the graph used.',
   'Larger measured times reduce percentage timing uncertainty for a timing resolution of fixed absolute size.'
  ],
  worked2:{q:'A best-fit h against t² graph has gradient 4.95 m s⁻² and intercept close to zero. Find g.',a:'h=(g/2)t², so g=2×4.95=9.90 m s⁻².'}
 },
 projectiles:{
  connections:[
   'With air resistance, the horizontal velocity is no longer constant and the descending path is not a mirror image of the ascent.',
   'For a vehicle at high speed, resistive forces increase with speed. Maximum steady speed occurs when driving force equals total resistance.',
   'Lift acts approximately perpendicular to relative airflow while drag acts approximately parallel and opposite to it.'
  ],
  worked2:{q:'A projectile is launched at 18 m s⁻¹ at 30° above horizontal. Find its initial components.',a:'uₓ=18cos30°=15.6 m s⁻¹; uᵧ=18sin30°=9.0 m s⁻¹.'}
 },
 newton:{
  connections:[
   'Newton II can be verified by measuring acceleration for different resultant forces at fixed mass, or different masses at fixed force.',
   'Normal contact force is not automatically equal to weight; that equality only follows in particular vertical-equilibrium situations.',
   'For connected objects, a shared tension may act in opposite directions on the two different bodies.'
  ],
  worked2:{q:'A 6.0 kg object is pulled right by 42 N while friction is 12 N left. Find acceleration.',a:'Resultant force = 42−12 = 30 N. a=30/6.0=5.0 m s⁻² right.'}
 },
 momentum:{
  connections:[
   'Elastic and inelastic collisions both conserve momentum in a closed system; only an elastic collision also conserves total kinetic energy.',
   'In an explosion, internal energy can become kinetic energy while total momentum remains unchanged.',
   'Transport safety features increase the time over which momentum changes, reducing average force for a similar change in momentum.'
  ],
  worked2:{q:'A 2.0 kg object initially at rest explodes into 0.50 kg moving at +12 m s⁻¹ and a second fragment. Find the second fragment velocity.',a:'Initial momentum = 0. After: 0.50×12 + 1.50v = 0, so v = −4.0 m s⁻¹.'}
 },
 work:{
  connections:[
   'For variable force, the area under a force–displacement graph is the energy transferred by mechanical work.',
   'The motor-efficiency practical links electrical input energy or power to useful gravitational potential energy gained by a lifted mass.',
   'P=Fv is a special form of power when force is parallel to velocity.'
  ],
  worked2:{q:'A motor lifts 15 kg through 2.0 m in 3.0 s. Find useful output power.',a:'Useful energy = mgh = 15×9.81×2.0 = 294.3 J. P = 294.3/3.0 = 98.1 W.'}
 },
 energy:{
  connections:[
   'Work done against resistance transfers energy away from the mechanical stores into internal energy and the surroundings.',
   'Energy methods are often efficient when only initial and final states matter, because the detailed time history is unnecessary.',
   'The specification includes estimation contexts, so checking the order of magnitude of energy answers is important.'
  ],
  worked2:{q:'A 3.0 kg object falls 4.0 m and loses 25 J to resistance. Find its kinetic-energy gain.',a:'GPE decrease = 3×9.81×4 = 117.7 J. KE gain = 117.7−25 = 92.7 J.'}
 },
 'density-hooke':{
  connections:[
   'Estimating density can involve estimating volume from dimensions before applying ρ=m/V.',
   'Analogue and digital meters can differ in resolution and how readings are judged; uncertainty should reflect the measuring instrument used.',
   'Hooke’s law describes the proportional region. Beyond that region force and extension may no longer be proportional even before permanent deformation becomes significant.'
  ],
  worked2:{q:'A 0.84 kg block has dimensions 0.10 m × 0.060 m × 0.025 m. Find its density.',a:'V = 1.50×10⁻⁴ m³. ρ = 0.84/(1.50×10⁻⁴) = 5.60×10³ kg m⁻³.'}
 },
 'stress-strain':{
  connections:[
   'Stress and strain remove the direct effect of sample dimensions, making them more suitable than force and extension for comparing materials.',
   'Area under a force–extension graph is energy for that sample; area under a stress–strain graph is energy transferred per unit volume.',
   'Breaking stress is a strength measure, whereas Young modulus measures stiffness.'
  ],
  worked2:{q:'A wire of area 3.0×10⁻⁷ m² carries 75 N. Calculate tensile stress.',a:'σ=F/A=75/(3.0×10⁻⁷)=2.5×10⁸ Pa.'}
 },
 'material-behaviour':{
  connections:[
   'Brittle materials fracture after relatively little plastic deformation, while ductile materials can sustain much greater plastic strain.',
   'Unloading from the plastic region leaves a permanent strain: the material does not return to its original dimensions.',
   'A large breaking stress does not necessarily imply a large Young modulus; strength and stiffness are distinct.'
  ],
  worked2:{q:'Material A has a steeper initial stress–strain gradient than B. What can be concluded?',a:'A has the larger Young modulus and is stiffer. This alone does not prove that A has the larger breaking stress.'}
 },
 young:{
  connections:[
   'Young modulus is only obtained from the initial linear elastic stress–strain region.',
   'For geometrically similar wires of the same material, changing length or cross-sectional area changes extension but not the material Young modulus.',
   'Because area depends on diameter squared, small fractional uncertainty in diameter can dominate the uncertainty in E.'
  ],
  worked2:{q:'A material has stress 9.0×10⁷ Pa at strain 4.5×10⁻⁴ in the linear region. Find E.',a:'E=stress/strain=(9.0×10⁷)/(4.5×10⁻⁴)=2.0×10¹¹ Pa.'}
 },
 rp4:{
  connections:[
   'A long test wire gives a larger extension for the same strain, making the extension easier to resolve as a percentage of its value.',
   'Repeated diameter measurements at different positions and orientations help detect non-uniformity and reduce random variation in the mean.',
   'A stress–strain gradient method uses many data points and should be restricted to the straight-line elastic region.'
  ],
  worked2:{q:'A stress–strain best-fit line has gradient 1.95×10¹¹ Pa. State the measured Young modulus.',a:'Young modulus is the gradient, so E = 1.95×10¹¹ Pa.'}
 },
 mastery:{
  connections:[
   'Decide first whether the most direct principle is force, energy, momentum, moments or a material relationship.',
   'Translate diagrams and graphs into physics quantities before choosing equations.',
   'State assumptions such as negligible drag, constant acceleration or a closed system when they matter to the model.'
  ],
  worked2:{q:'A vehicle rolls down a hill then collides and sticks to a stationary trolley. Which two major principles are likely to be useful?',a:'Energy conservation for the downhill speed (with any resistive work included), then momentum conservation for the short collision.'}
 }
};
lessons.forEach(l=>Object.assign(l,lessonDeepening[l.id]||{}));

const lessonTextbook = {
 vectors:[
  ['Scalar or vector?','A scalar needs only a size and unit. A vector also needs direction. In mechanics, speed and distance are scalars, while velocity and displacement are vectors. Mass is scalar; weight is a force and therefore a vector.','Sort these into scalar/vector without notes: energy, acceleration, time, force, speed, displacement. Then explain one choice.'],
  ['Adding vectors','Vectors combine head-to-tail. For two perpendicular vectors, Pythagoras gives the resultant magnitude and trigonometry gives its direction. A scale drawing is an alternative method and is especially useful when vectors are not perpendicular.','Draw 7 N east followed by 4 N north using a scale of 1 cm = 1 N. Measure the resultant, then check by calculation.'],
  ['Direction matters','A vector answer is incomplete if it gives only a magnitude. The direction must be referenced clearly, for example “30° north of east”. Negative components are useful algebraically: they show that a component points opposite to the chosen positive direction.','Take east as positive. Write signed components for 12 N west and 5 N east, then find the resultant.'],
  ['Exam thinking','Before calculating, identify whether each quantity is scalar or vector and draw a quick arrow diagram. This prevents common errors such as adding magnitudes that act in different directions.','Write one sentence explaining why distance can be large while displacement is zero after a round trip.']
 ],
 resolution:[
  ['Resolving a force','Resolving replaces one vector by perpendicular components with exactly the same combined effect. If an angle is measured from the horizontal, the horizontal component is the adjacent side and uses cosine; the vertical component is the opposite side and uses sine.','Resolve a 75 N force at 40° above horizontal into horizontal and vertical components.'],
  ['Inclined planes','On a slope, axes parallel and perpendicular to the plane usually make the problem simpler. Weight resolves into mg sinθ down the slope and mg cosθ into the slope when θ is the slope angle.','For a 3.0 kg block on a 25° slope, calculate both components of its weight.'],
  ['Equilibrium','Equilibrium means zero resultant force. The object can be stationary or move at constant velocity. In two dimensions, horizontal components must balance and vertical components must balance. Three coplanar forces in equilibrium can also be represented by a closed vector triangle.','Sketch three force arrows that could close to form an equilibrium triangle.'],
  ['Choosing a method','Use components when directions align naturally with convenient axes. Use a scale drawing when angles are awkward or when the question explicitly asks for one. Always state the positive directions used in a calculation.','Explain which method you would choose for a block on a slope and why.']
 ],
 moments:[
  ['Moment of a force','A moment is the turning effect of a force about a point. The equation uses the perpendicular distance from the pivot to the force line of action, not the distance to the object. The SI unit is N m.','A 55 N force acts 0.28 m perpendicularly from a pivot. Calculate the moment.'],
  ['Principle of moments','For rotational equilibrium, the total clockwise moment about a chosen point equals the total anticlockwise moment. Choosing a pivot through an unknown reaction force can remove that unknown from the calculation.','Balance a 300 N load 1.2 m left of a pivot with a 450 N load on the right. Find the distance.'],
  ['Couples','A couple is a pair of equal, opposite, parallel forces acting along different lines. The resultant force is zero but the pair still produces rotation. Couple moment equals one force multiplied by the perpendicular separation of the lines of action.','Calculate the moment of a 25 N couple separated by 0.40 m.'],
  ['Centre of mass','The centre of mass is the point through which the weight of a body can be treated as acting. For a uniform regular solid it is at the geometric centre. Stability changes when the line of action of weight moves outside the base.','Draw a block on a table and mark its centre of mass and weight line of action.']
 ],
 kinematics:[
  ['Motion quantities','Displacement measures change of position with direction. Velocity is rate of change of displacement. Acceleration is rate of change of velocity, so an object can accelerate by changing speed, direction, or both.','Give the sign of velocity and acceleration for an object moving left but slowing down if right is positive.'],
  ['Displacement–time graphs','The gradient of a displacement–time graph is velocity. A straight line means constant velocity; a curved line means the velocity is changing. Instantaneous velocity on a curve is found from the gradient of a tangent.','Sketch a displacement–time graph for motion away from the origin at constant speed, then stationary, then returning faster.'],
  ['Velocity–time graphs','The gradient of a velocity–time graph is acceleration. The signed area under it is displacement. An area below the time axis is negative displacement, so total distance may be larger than the magnitude of displacement.','Find displacement from a 6 s triangle that rises from 0 to 12 m s⁻¹.'],
  ['Acceleration–time graphs','The signed area under an acceleration–time graph is change in velocity. A bouncing ball gives a useful example: between impacts acceleration is nearly constant at g downward, while impact produces a large rapid velocity change.','Explain why a bouncing-ball velocity graph has sudden jumps at impact.']
 ],
 suvat:[
  ['What SUVAT assumes','The SUVAT equations describe motion with constant acceleration. List s, u, v, a and t before choosing an equation. If acceleration changes significantly, split the motion into stages or use another method.','For a car with changing acceleration, explain why one SUVAT calculation over the whole motion may be invalid.'],
  ['Choosing the equation','Pick the equation containing the required quantity and the quantities you already know. The four main forms are v=u+at, s=½(u+v)t, v²=u²+2as, and s=ut+½at².','If u, v, a and s are involved but time is not, identify the best SUVAT equation.'],
  ['Signs and gravity','Choose one positive direction and keep it. For vertical motion with upward positive, acceleration due to gravity is −9.81 m s⁻². At the highest point of a throw, velocity is zero for an instant but acceleration is still downward.','A ball is thrown upward at 10 m s⁻¹. Write u, v and a at maximum height using upward positive.'],
  ['Multi-stage motion','Some problems require separate stages, for example acceleration then braking. The final velocity of the first stage becomes the initial velocity of the next. Avoid rounding intermediate answers too early.','Plan the stages for a car that accelerates for 8 s then brakes to rest.']
 ],
 rp3:[
  ['Aim and relationship','Required Practical 3 determines g by a free-fall method. For release from rest and negligible drag, h=½gt². Plotting h against t² should give a straight line with gradient g/2.','Rearrange h=½gt² to show exactly why the gradient equals g/2.'],
  ['Measurements','Measure a fall distance and the corresponding fall time over a useful range of heights. Electronic timing reduces reaction-time effects. Keep reference points consistent when measuring distance.','List the independent, dependent and two control variables for a free-fall investigation.'],
  ['Processing data','Repeat measurements, calculate t², plot h on the y-axis against t² on the x-axis, draw a best-fit line and use a large gradient triangle. Then calculate g=2×gradient.','If the best-fit gradient is 4.86 m s⁻², calculate g and percentage difference from 9.81 m s⁻².'],
  ['Evaluation','Random uncertainty creates scatter and can be reduced by repeats and a mean. A systematic offset shifts results in a similar direction and is not removed by repeats. A non-zero graph intercept may indicate an offset worth investigating.','Give one random error, one systematic error and a specific improvement for each.']
 ],
 projectiles:[
  ['Independent components','Projectile motion is split into horizontal and vertical components that share the same time. Without drag, horizontal acceleration is zero while vertical acceleration is g downward. Resolve the launch velocity before applying SUVAT to each direction.','Resolve 20 m s⁻¹ at 35° into horizontal and vertical components.'],
  ['Solving a projectile','Use vertical motion to find a time, height or vertical velocity, then use that same time in the horizontal direction. At maximum height vertical velocity is zero, but vertical acceleration remains g downward.','Explain how you would find the range of a projectile that lands at its launch height.'],
  ['Drag and trajectory','Air resistance acts opposite to motion and increases with speed. With drag, horizontal speed falls and the path is no longer symmetric. The descending branch is typically steeper than the ideal no-drag case.','Compare the ideal and drag trajectories in the simulator and record two differences.'],
  ['Terminal and maximum speed','A falling object approaches terminal speed when drag balances weight, giving zero resultant force and zero acceleration. A vehicle reaches maximum steady speed when driving force balances total resistance. Lift is approximately perpendicular to relative airflow; drag is opposite it.','Explain why terminal speed does not mean that no forces act.']
 ],
 newton:[
  ['First law','Newton’s first law says that if resultant force is zero, velocity remains constant. Constant velocity includes being stationary. This is the idea of inertia.','Give one example of an object with forces acting on it but zero acceleration.'],
  ['Second law','For constant mass, resultant force equals ma. Draw a free-body diagram first, select a positive direction, combine forces to obtain ΣF, then apply ΣF=ma.','A 7 kg object has 50 N right and 15 N left. Calculate its acceleration.'],
  ['Third law','Third-law forces are equal in magnitude, opposite in direction, same interaction type and act on different objects. Balanced forces on one object are not a third-law pair.','Identify the third-law partner of Earth pulling a falling ball downward gravitationally.'],
  ['Free-body diagrams','A free-body diagram contains only forces acting on the chosen object. Typical forces include weight, normal contact force, tension, drag/friction and applied forces. Do not draw forces the object exerts on other objects.','Draw a free-body diagram for a hanging lift accelerating upward.']
 ],
 momentum:[
  ['Momentum and signs','Momentum p=mv is a vector. In one-dimensional problems, choose a positive direction and use signed velocities. Total momentum of a closed system is conserved during an interaction when external impulse is negligible.','Calculate momentum of a 0.60 kg trolley moving at −4.0 m s⁻¹.'],
  ['Force and impulse','Force is rate of change of momentum, F=Δp/Δt. Impulse equals Δp and is also the area under a force–time graph. For the same Δp, increasing contact time reduces average force.','Explain why padding reduces impact force without necessarily changing the total momentum change.'],
  ['Collisions','Momentum is conserved in both elastic and inelastic collisions. In an ideal elastic collision total kinetic energy is also conserved. In a perfectly inelastic collision objects may stick together and kinetic energy is transferred to other stores.','Use signed momentum to predict the direction of a combined pair after a sticking collision.'],
  ['Explosions and transport','In an explosion, internal energy can become kinetic energy while total momentum remains constant. Safety design such as crumple zones changes the time profile of force and can reduce peak/average forces.','Explain how a force–time graph could show the benefit of a crumple zone.']
 ],
 work:[
  ['Work done','Work is energy transferred by a force through a displacement. For a constant force at angle θ to displacement, W=Fs cosθ. Only the component of force parallel to displacement does work in this expression.','Calculate work done by 80 N through 5 m at 60° to the displacement.'],
  ['Kinetic and gravitational energy','Kinetic energy is ½mv², so speed has a strong squared effect. Near Earth, gravitational potential energy change is mgΔh and depends on vertical height change.','Compare the KE of the same car at 10 m s⁻¹ and 20 m s⁻¹.'],
  ['Power','Power is rate of doing work or transferring energy: P=ΔW/Δt. When a force is parallel to the motion, P=Fv. This form is useful for engines moving at steady speed against resistance.','A car travels at 25 m s⁻¹ against 900 N resistance. Find the required power.'],
  ['Variable force and efficiency','For a varying force, work is the area under the force–displacement graph. Efficiency is useful output divided by total input and can be written as a decimal or percentage.','Sketch a linearly increasing F–s graph and explain how you would calculate the work done.']
 ],
 energy:[
  ['Conservation principle','Energy cannot be created or destroyed. Define a system, identify the initial and final stores and include energy transferred across the system boundary. In an ideal closed mechanical system, GPE and KE can exchange while their total remains constant.','Write an energy equation for a frictionless object descending a ramp from rest.'],
  ['Resistive forces','When resistance acts, mechanical energy decreases because energy is transferred to internal energy of the system/surroundings. The work done against resistance is part of the energy accounting, not “lost energy”.','A falling object loses 18 J to drag. Explain where that energy goes.'],
  ['Using energy efficiently','Energy methods are powerful when only initial and final states matter. They can avoid solving for time or acceleration. Use Newton/SUVAT instead when detailed forces, accelerations or times are required.','Choose between an energy method and SUVAT for finding the speed at the bottom of a frictionless hill and justify your choice.'],
  ['Estimation','AQA also expects sensible physical estimates. Check the order of magnitude, units and whether your final energy is physically possible.','Estimate the GPE change of a 60 kg person climbing one floor of a building and state your assumed height.']
 ],
 'density-hooke':[
  ['Density','Density is mass per unit volume, ρ=m/V. In SI, mass is in kg and volume in m³. Estimation questions may require you to estimate dimensions and therefore volume before calculating density.','Estimate the density of a rectangular sample from plausible mass and dimensions.'],
  ['Hooke’s law','In the proportional region, force is proportional to extension: F=kΔL. Spring constant k measures stiffness for that spring/object and has units N m⁻¹.','A spring extends 30 mm under 9 N. Calculate k in SI units.'],
  ['Proportional and elastic limits','The limit of proportionality marks where F is no longer proportional to extension. The elastic limit concerns whether the object returns to its original dimensions after unloading. These ideas are related but not identical.','Explain what observation would show that the elastic limit has been exceeded.'],
  ['Measurement quality','Materials investigations often use rulers, micrometers or other analogue/digital instruments. Resolution, zero error and reading technique affect uncertainty.','Compare one advantage and one limitation of digital and analogue length measurements.']
 ],
 'stress-strain':[
  ['Tensile stress','Tensile stress is force divided by cross-sectional area. It describes the loading intensity and allows samples of different sizes to be compared. The SI unit is Pa.','Calculate stress for 100 N applied to 4.0×10⁻⁷ m².'],
  ['Tensile strain','Tensile strain is extension divided by original length. It is dimensionless because it is a ratio of lengths. Original length and extension are different quantities.','A 2.0 m wire extends by 1.0 mm. Calculate strain.'],
  ['Elastic strain energy','For a linear force–extension relation, elastic strain energy is the triangular area under the graph: ½FΔL. Equivalently for a Hookean spring, E=½k(ΔL)².','Calculate stored energy in a spring with k=200 N m⁻¹ extended by 0.10 m.'],
  ['Energy per volume','Area under a stress–strain graph represents energy transferred per unit volume. This helps compare deformation energy between materials independently of sample size.','Explain why force–extension and stress–strain graphs answer different comparison questions.']
 ],
 'material-behaviour':[
  ['Elastic and plastic behaviour','Elastic deformation is recoverable after unloading. Plastic deformation leaves permanent strain. On a stress–strain or force–extension graph, a ductile material can show a substantial plastic region.','Describe what happens to the sample length after unloading from the plastic region.'],
  ['Brittle fracture','A brittle material fractures with little plastic deformation. Brittle does not automatically mean weak: brittleness describes deformation behaviour before fracture, while breaking stress describes strength.','Compare a brittle and ductile material using the shape of their stress–strain curves.'],
  ['Strength versus stiffness','Young modulus measures stiffness through the initial stress–strain gradient. Breaking stress measures the stress at failure. A material can be stiff but not especially strong, or strong but relatively flexible.','State which graph feature tells you stiffness and which tells you strength.'],
  ['Energy and design','The area under a force–extension graph is deformation energy for a specific sample. Materials used in transport structures are selected by balancing stiffness, strength, mass, energy absorption and other constraints.','Explain why a crumple-zone material may be chosen to deform rather than remain perfectly rigid.']
 ],
 young:[
  ['Definition','Young modulus E is tensile stress divided by tensile strain in the linear elastic region. It is a material property measured in Pa. A larger E means a stiffer material.','Calculate E for stress 1.2×10⁸ Pa and strain 6.0×10⁻⁴.'],
  ['Graph method','On a graph of stress on the y-axis against strain on the x-axis, the initial straight-line gradient is Young modulus. Use two widely separated points on a best-fit line rather than simply joining two raw points.','Explain why the gradient should be taken only from the initial linear section.'],
  ['Wire form','Combining stress=F/A and strain=ΔL/L gives E=FL/(AΔL). Longer wires extend more for the same stress, while larger cross-sectional area reduces extension for the same force.','Predict what happens to extension if wire length doubles but material, area and force remain unchanged.'],
  ['Geometry and uncertainty','For a circular wire A=πd²/4. Because d is squared, percentage uncertainty in diameter has roughly twice that effect on area, making diameter measurement especially important.','A diameter has 2% uncertainty. Estimate the percentage uncertainty contribution to area.']
 ],
 rp4:[
  ['Aim and method','Required Practical 4 determines Young modulus by a simple tensile method. Measure original wire length and diameter, apply known tensile forces, measure extension and remain within the linear elastic region.','Identify the independent variable, dependent variable and two important measured dimensions.'],
  ['Good measurements','Measure diameter at several positions and orientations because real wire may vary or be slightly non-circular. A long test length gives a larger extension for the same strain, improving percentage resolution of extension.','Explain why one diameter reading is weaker than several measurements around the wire.'],
  ['Processing','Convert force and geometry to stress, convert extension and original length to strain, plot stress against strain and obtain E from the initial best-fit gradient. Alternatively use E=FL/(AΔL) for individual values.','Write the steps from a mass reading to a stress value.'],
  ['Evaluation and uncertainty','Check zero errors, avoid parallax where relevant, keep the wire within its elastic region and consider the squared effect of diameter uncertainty on area. Repeats reduce random variation but not systematic offsets.','Identify the measurement likely to dominate uncertainty and explain why.']
 ],
 mastery:[
  ['Choose the principle','Before calculating, decide whether the problem is mainly about forces, moments, momentum, energy, kinematics or materials. A clear sketch and labelled variables usually reveal the shortest route.','For a car rolling down a hill before colliding, identify which principle suits each stage.'],
  ['Model assumptions','Physics equations depend on assumptions: constant acceleration for SUVAT, negligible external impulse for momentum conservation, linear elasticity for Young modulus, or negligible drag for ideal projectile motion. State assumptions when they affect the answer.','Give one equation and the assumption that makes it valid.'],
  ['Check the answer','A strong final check includes units, sign/direction, significant figures and physical reasonableness. Compare with a simple estimate where possible.','Invent an impossible mechanics answer and explain which check would catch it.'],
  ['Connect topics','High-level questions often combine topics. Force changes momentum, work changes energy, graph areas encode physical quantities and materials ideas link force/extension to energy and stress/strain.','Create a two-step mechanics problem that uses two different principles, then outline its solution.']
 ]
};
lessons.forEach(l=>l.textbook=lessonTextbook[l.id]||[]);

const lessonSkillMap = {
 vectors:['MS 0.6','MS 4.2','MS 4.4','MS 4.5','PS 1.1'],
 resolution:['MS 0.6','MS 4.2','MS 4.4','MS 4.5','PS 1.1'],
 moments:['Mathematical modelling'],
 kinematics:['MS 3.5','MS 3.6','MS 3.7','PS 1.1','PS 3.1'],
 suvat:['MS 0.5','MS 2.2','MS 2.3','MS 2.4'],
 rp3:['Required Practical 3','AT d','MS 3.9','PS 1.1'],
 projectiles:['PS 2.2','PS 3.1'],
 newton:['PS 4.1','MS 4.1','MS 4.2','AT a/b/d'],
 momentum:['MS 2.2','MS 2.3'],
 work:['MS 0.3','PS 3.3','PS 4.1','AT a/b/f'],
 energy:['MS 0.4','MS 2.2'],
 'density-hooke':['MS 0.2','MS 4.3','AT e','PS 3.3'],
 'stress-strain':['MS 4.3','PS 3.3'],
 'material-behaviour':['MS 4.3'],
 young:['MS 3.1'],
 rp4:['Required Practical 4','MS 3.1'],
 mastery:['Synoptic problem solving']
};
lessons.forEach(l=>l.skills=lessonSkillMap[l.id]||[]);

const lessonPractice = {
 vectors:[
  {q:'A displacement has components 9.0 m east and 12.0 m north. Calculate the resultant magnitude.',type:'number',answer:15,tol:.05,unit:'m',explain:'Use Pythagoras: √(9²+12²)=15 m.'},
  {q:'Why is velocity a vector?',type:'text',keywords:['direction','magnitude'],answerText:'Because velocity has both magnitude and direction.'}
 ],
 resolution:[
  {q:'A 100 N force acts at 60° above the horizontal. Calculate its horizontal component.',type:'number',answer:50,tol:.5,unit:'N',explain:'Fₓ=F cos60°=50 N.'},
  {q:'State the condition for translational equilibrium.',type:'text',keywords:['resultant','zero'],answerText:'The resultant force is zero.'}
 ],
 moments:[
  {q:'A 75 N force acts perpendicularly 0.40 m from a pivot. Calculate the moment.',type:'number',answer:30,tol:.1,unit:'N m',explain:'M=Fd=75×0.40=30 N m.'},
  {q:'What is a couple?',type:'text',keywords:['equal','opposite','parallel','forces'],answerText:'Two equal, opposite, parallel forces acting along different lines.'}
 ],
 kinematics:[
  {q:'Velocity rises uniformly from 3.0 to 15.0 m s⁻¹ in 4.0 s. Calculate the acceleration.',type:'number',answer:3,tol:.03,unit:'m s⁻²',explain:'a=(15−3)/4=3.0 m s⁻².'},
  {q:'What does area under an acceleration–time graph represent?',type:'text',keywords:['change','velocity'],answerText:'The change in velocity.'}
 ],
 suvat:[
  {q:'An object starts from rest and accelerates at 2.5 m s⁻² for 6.0 s. Find its final speed.',type:'number',answer:15,tol:.05,unit:'m s⁻¹',explain:'v=u+at=0+2.5×6=15 m s⁻¹.'},
  {q:'At the highest point of a vertical throw, what is the acceleration?',type:'text',keywords:['9.81','down'],answerText:'Approximately 9.81 m s⁻² downward.'}
 ],
 rp3:[
  {q:'A graph of h against t² has gradient 4.91 m s⁻². Calculate g.',type:'number',answer:9.82,tol:.05,unit:'m s⁻²',explain:'h=(g/2)t², so g=2×gradient.'},
  {q:'Do repeated readings remove systematic error?',type:'text',keywords:['no'],answerText:'No. Repeats reduce random uncertainty but do not remove a systematic offset.'}
 ],
 projectiles:[
  {q:'A ball is launched horizontally at 8.0 m s⁻¹ for 0.60 s. Ignoring drag, calculate horizontal displacement.',type:'number',answer:4.8,tol:.03,unit:'m',explain:'x=uₓt=8.0×0.60=4.8 m.'},
  {q:'Why is acceleration not zero at the top of a projectile path?',type:'text',keywords:['gravity','down'],answerText:'Gravity still acts downward, so acceleration remains g downward.'}
 ],
 newton:[
  {q:'A 4.0 kg object experiences a resultant force of 18 N. Calculate acceleration.',type:'number',answer:4.5,tol:.03,unit:'m s⁻²',explain:'a=F/m=18/4=4.5 m s⁻².'},
  {q:'Why do Newton third-law forces not cancel on one free-body diagram?',type:'text',keywords:['different','objects'],answerText:'They act on different interacting objects.'}
 ],
 momentum:[
  {q:'A 0.50 kg trolley travels at 6.0 m s⁻¹. Calculate its momentum.',type:'number',answer:3,tol:.02,unit:'kg m s⁻¹',explain:'p=mv=0.50×6.0=3.0 kg m s⁻¹.'},
  {q:'What does area under a force–time graph represent?',type:'text',keywords:['impulse'],answerText:'Impulse, which equals change in momentum.'}
 ],
 work:[
  {q:'A constant 40 N force moves an object 3.0 m in the same direction. Calculate work done.',type:'number',answer:120,tol:.2,unit:'J',explain:'W=Fs=40×3=120 J.'},
  {q:'What graph area represents work done by a varying force?',type:'text',keywords:['force','displacement'],answerText:'Area under a force–displacement graph.'}
 ],
 energy:[
  {q:'A 2.0 kg object falls through 5.0 m. Calculate the GPE decrease using g=9.81 m s⁻².',type:'number',answer:98.1,tol:.2,unit:'J',explain:'ΔEₚ=mgΔh=2×9.81×5=98.1 J.'},
  {q:'If mechanical energy decreases because of friction, is total energy destroyed?',type:'text',keywords:['no','transferred'],answerText:'No. Energy is transferred to other stores, commonly internal energy.'}
 ],
 'density-hooke':[
  {q:'A 0.60 kg sample has volume 2.0×10⁻⁴ m³. Calculate density.',type:'number',answer:3000,tol:5,unit:'kg m⁻³',explain:'ρ=m/V=0.60/(2.0×10⁻⁴)=3000 kg m⁻³.'},
  {q:'What is the difference between extension and total length?',type:'text',keywords:['change','length'],answerText:'Extension is the change in length from the original length.'}
 ],
 'stress-strain':[
  {q:'A force of 200 N acts on area 4.0×10⁻⁶ m². Calculate tensile stress.',type:'number',answer:5e7,tol:1e5,unit:'Pa',explain:'σ=F/A=200/(4×10⁻⁶)=5.0×10⁷ Pa.'},
  {q:'Does tensile strain have a unit?',type:'text',keywords:['no'],answerText:'No. It is a ratio of two lengths.'}
 ],
 'material-behaviour':[
  {q:'A material returns to its original dimensions after unloading. Is the deformation elastic or plastic?',type:'text',keywords:['elastic'],answerText:'Elastic.'},
  {q:'What graph feature distinguishes a more ductile material?',type:'text',keywords:['strain'],answerText:'It reaches a larger strain before fracture / has a larger plastic region.'}
 ],
 young:[
  {q:'Stress is 1.5×10⁸ Pa and strain is 7.5×10⁻⁴. Calculate Young modulus.',type:'number',answer:2e11,tol:2e8,unit:'Pa',explain:'E=stress/strain=2.0×10¹¹ Pa.'},
  {q:'What does the gradient of the initial linear stress–strain graph represent?',type:'text',keywords:['young','modulus'],answerText:'Young modulus.'}
 ],
 rp4:[
  {q:'Why is uncertainty in wire diameter especially important?',type:'text',keywords:['area','squared'],answerText:'Area depends on diameter squared, A=πd²/4.'},
  {q:'Why should several diameter readings be taken?',type:'text',keywords:['variation','mean'],answerText:'To account for variation in diameter and obtain a more reliable mean.'}
 ],
 mastery:[
  {q:'Before choosing an equation in an unfamiliar mechanics problem, what should you identify first?',type:'text',keywords:['system','diagram'],answerText:'Define the system and represent the situation with a clear diagram / variables.'},
  {q:'What two checks should follow a numerical answer?',type:'text',keywords:['unit','sensible'],answerText:'Check units/dimensions and physical reasonableness.'}
 ]
};

const masteryState = JSON.parse(localStorage.getItem('mechanicsMastery')||'{}');
function masteryCodeForLesson(l){
 if(l.id==='rp3') return 'RP3';
 if(l.id==='rp4') return 'RP4';
 const m=(l.code||'').match(/3\.4\.\d\.\d/); return m?m[0]:'3.4';
}
function recordMastery(code,correct){
 if(!masteryState[code]) masteryState[code]={correct:0,total:0};
 masteryState[code].total+=1;
 if(correct) masteryState[code].correct+=1;
 localStorage.setItem('mechanicsMastery',JSON.stringify(masteryState));
 renderMasteryPanel();
}
function masteryPct(code){
 const m=masteryState[code]; return m&&m.total ? Math.round(100*m.correct/m.total) : null;
}
function renderMasteryPanel(){
 const grid=$('#masteryGrid'),pctEl=$('#masteryPercent'),sumEl=$('#masterySummary'),nextEl=$('#nextBestAction');
 if(!grid||!pctEl||!sumEl||!nextEl)return;
 const rows=spec.map(s=>({code:s[0],title:s[1],pct:masteryPct(s[0]),attempts:(masteryState[s[0]]||{}).total||0,lesson:s[3]}));
 const attempted=rows.filter(r=>r.attempts>0);
 const total=attempted.reduce((a,r)=>a+r.attempts,0),correct=attempted.reduce((a,r)=>a+((masteryState[r.code]||{}).correct||0),0);
 const overall=total?Math.round(100*correct/total):0;
 pctEl.textContent=overall+'%';
 sumEl.textContent=total?correct+' correct from '+total+' tracked attempts.':'Answer questions to build a topic profile.';
 grid.innerHTML=rows.map(r=>'<article class="mastery-topic"><div class="mastery-line"><strong>'+r.code+'</strong><small>'+(r.pct===null?'Not tested':r.pct+'%')+'</small></div><div class="mastery-bar"><span style="width:'+(r.pct===null?0:r.pct)+'%"></span></div><small>'+r.title+'</small></article>').join('');
 const weakest=attempted.slice().sort((a,b)=>(a.pct??101)-(b.pct??101))[0];
 if(weakest && weakest.pct<80){
  nextEl.innerHTML='Recommended next step: revisit <strong>'+weakest.title+'</strong> ('+weakest.code+'), then retry related questions.';
 }else if(total){
  nextEl.textContent='Strong profile so far. Continue mixed practice to confirm mastery across every specification point.';
 }else{
  nextEl.textContent='Complete some exam or lesson questions to receive a recommended next step.';
 }
}
function renderLessonPractice(l){
 const qs=lessonPractice[l.id]||[];
 return '<div class="practice-stack">'+qs.map((q,i)=>'<div class="practice-question"><p><strong>'+(i+1)+'. '+q.q+'</strong></p><div class="practice-entry"><input '+(q.type==='number'?'type="number" step="any"':'type="text"')+' data-practice-input="'+i+'" placeholder="Enter your answer"><button class="button" data-practice-check="'+i+'">Check answer</button></div><div class="practice-feedback hidden" data-practice-feedback="'+i+'"></div></div>').join('')+'</div>';
}
function bindLessonPractice(l){
 Array.from($('#lessonPanel').querySelectorAll('[data-practice-check]')).forEach(b=>b.addEventListener('click',()=>{
  const i=Number(b.dataset.practiceCheck),q=(lessonPractice[l.id]||[])[i],input=$('[data-practice-input="'+i+'"]',$('#lessonPanel')),fb=$('[data-practice-feedback="'+i+'"]',$('#lessonPanel'));
  let ok=false;
  if(q.type==='number'){
   const val=Number(input.value); ok=Number.isFinite(val)&&Math.abs(val-q.answer)<=q.tol;
  }else{
   const text=input.value.toLowerCase(); ok=(q.keywords||[]).every(k=>text.includes(k.toLowerCase()));
  }
  fb.className='practice-feedback '+(ok?'good':'bad');
  fb.textContent=(ok?'Correct. ':'Not quite. ')+(q.explain||q.answerText||'');
  recordMastery(masteryCodeForLesson(l),ok);
  setLessonCheckpoint(l.id,'practice'+i,ok);
 }));
}


const lessonReadinessState = JSON.parse(localStorage.getItem('mechanicsLessonReadiness')||'{}');
function setLessonCheckpoint(lessonId,key,correct){
 if(!lessonReadinessState[lessonId])lessonReadinessState[lessonId]={};
 // Readiness tracks best demonstrated result, so a later slip does not erase prior mastery.
 if(correct)lessonReadinessState[lessonId][key]=true;
 else if(!(key in lessonReadinessState[lessonId]))lessonReadinessState[lessonId][key]=false;
 localStorage.setItem('mechanicsLessonReadiness',JSON.stringify(lessonReadinessState));
 updateLessonReadinessUI(lessonId);
}
function lessonReadiness(lessonId){
 const expected=(lessonPractice[lessonId]||[]).map((_,i)=>'practice'+i).concat(['check']);
 const state=lessonReadinessState[lessonId]||{};
 const passed=expected.filter(k=>state[k]===true).length;
 return {passed,total:expected.length,pct:expected.length?Math.round(100*passed/expected.length):0};
}
function readinessHtml(lessonId){
 const r=lessonReadiness(lessonId),message=r.pct>=100?'Ready to progress: all mastery checks passed.':r.pct>=67?'Nearly there: revisit any missed checkpoint before moving on.':'Build confidence by completing the auto-marked practice and knowledge check.';
 return '<div class="lesson-readiness" data-readiness-box><div class="readiness-head"><strong>Lesson readiness</strong><span data-readiness-score>'+r.pct+'%</span></div><div class="readiness-bar"><span data-readiness-fill style="width:'+r.pct+'%"></span></div><small data-readiness-message>'+message+'</small></div>';
}
function updateLessonReadinessUI(lessonId){
 const box=$('[data-readiness-box]');if(!box)return;
 const r=lessonReadiness(lessonId),message=r.pct>=100?'Ready to progress: all mastery checks passed.':r.pct>=67?'Nearly there: revisit any missed checkpoint before moving on.':'Build confidence by completing the auto-marked practice and knowledge check.';
 const score=$('[data-readiness-score]',box),fill=$('[data-readiness-fill]',box),msg=$('[data-readiness-message]',box);
 if(score)score.textContent=r.pct+'%';if(fill)fill.style.width=r.pct+'%';if(msg)msg.textContent=message;
}

const completed = new Set(JSON.parse(localStorage.getItem('mechanicsCompleted') || '[]'));
let activeLesson = 0;

function saveProgress(){
 localStorage.setItem('mechanicsCompleted',JSON.stringify(Array.from(completed)));
 const pct = lessons.length ? 100*completed.size/lessons.length : 0;
 $('#progressText').textContent = completed.size+' / '+lessons.length+' complete';
 $('#progressFill').style.width = pct+'%';
 renderSpec();
}
function renderCourseList(){
 const host=$('#courseList');
 host.innerHTML='';
 lessons.forEach((l,i)=>{
  const b=document.createElement('button');
  b.className='course-button'+(i===activeLesson?' active':'')+(completed.has(l.id)?' complete':'');
  b.innerHTML='<span class="course-code">'+l.code+'</span><span class="course-title">'+l.title+'</span>';
  b.addEventListener('click',()=>{activeLesson=i;renderCourseList();renderLesson();});
  host.appendChild(b);
 });
}
function lessonChunk(title,id,html,active=false){
 return '<section class="chunk '+(active?'active':'')+'" data-chunk-panel="'+id+'"><div class="lesson-block"><h3>'+title+'</h3>'+html+'</div></section>';
}
function renderLesson(){
 const l=lessons[activeLesson];
 const saved=JSON.parse(localStorage.getItem('mechanicsLessonAnswers')||'{}');
 const answerKey=(kind,i='')=>l.id+'::'+kind+'::'+i;
 let retrieval=l.retrieval.map((r,i)=>'<div class="mini-question"><p><strong>'+(i+1)+'. '+r.q+'</strong></p><textarea class="student-answer" data-answer-key="'+answerKey('retrieval',i)+'" placeholder="Type your answer here...">'+(saved[answerKey('retrieval',i)]||'')+'</textarea><button class="text-button reveal-answer">Show answer</button><div class="answer-reveal">'+r.a+'</div></div>').join('');
 let objectives='<ul>'+l.objectives.map(x=>'<li>'+x+'</li>').join('')+'</ul><div class="skill-row">'+(l.skills||[]).map(x=>'<span class="skill-badge">'+x+'</span>').join('')+'</div>';
 let core='<div class="textbook-note"><strong>Core explanation</strong><p>Work through each statement slowly. These notes are aligned to the AQA specification point shown above.</p></div><ul>'+l.core.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
 let textbook='<div class="guided-textbook">'+(l.textbook||[]).map((s,i)=>'<article class="textbook-chunk"><div class="textbook-chunk-head"><span class="depth-number">'+(i+1)+'</span><h4>'+s[0]+'</h4></div><p>'+s[1]+'</p><div class="textbook-do"><strong>Do:</strong> '+s[2]+'</div></article>').join('')+'</div>';
 let terms='<div class="term-grid">'+(l.keyTerms||[]).map(t=>'<article class="term-card"><strong>'+t[0]+'</strong><span>'+t[1]+'</span></article>').join('')+'</div>';
 let depth='<div class="depth-list">'+(l.depth||[]).map((x,i)=>'<article class="depth-card"><span class="depth-number">'+(i+1)+'</span><p>'+x+'</p></article>').join('')+'</div>';
 let connections='<div class="connection-grid">'+(l.connections||[]).map((x,i)=>'<article class="connection-card"><span class="eyebrow">Connection '+(i+1)+'</span><p>'+x+'</p></article>').join('')+'</div>';
 let worked='<p><strong>Example 1:</strong> '+l.worked.q+'</p><button class="text-button reveal-answer">Show worked answer</button><div class="answer-reveal">'+l.worked.a+'</div>'+(l.worked2?'<hr class="soft-rule"><p><strong>Example 2:</strong> '+l.worked2.q+'</p><button class="text-button reveal-answer">Show second worked answer</button><div class="answer-reveal">'+l.worked2.a+'</div>':'');
 let practice=renderLessonPractice(l);
 let task='<p>'+l.task+'</p><textarea class="student-answer" data-answer-key="'+answerKey('task')+'" placeholder="Record your working, prediction or explanation...">'+(saved[answerKey('task')]||'')+'</textarea>';
 let technique='<div class="exam-grid"><article class="exam-tip"><h4>Exam technique</h4><ul>'+(l.exam||[]).map(x=>'<li>'+x+'</li>').join('')+'</ul></article><article class="exam-tip warning"><h4>Common traps</h4><ul>'+(l.pitfalls||[]).map(x=>'<li>'+x+'</li>').join('')+'</ul></article></div>';
 let check='<div class="mini-question"><p><strong>'+l.check.q+'</strong></p><div class="mini-options">'+l.check.choices.map((x,i)=>'<button class="mini-option" data-mini="'+i+'">'+x+'</button>').join('')+'</div><div class="feedback hidden" data-mini-feedback></div></div>';
 let exit='<p>'+l.exit+'</p><textarea class="student-answer" data-answer-key="'+answerKey('exit')+'" placeholder="Write your exit-ticket answer...">'+(saved[answerKey('exit')]||'')+'</textarea>';
 const chunks=[
  ['retrieval','1 · Retrieval'],['objectives','2 · Objectives'],['core','3 · Core teaching'],['textbook','4 · Guided textbook'],['terms','5 · Key terms'],['depth','6 · AQA depth'],['connections','7 · Connections'],['worked','8 · Worked examples'],['practice','9 · Auto-mark practice'],['task','10 · Apply it'],['technique','11 · Exam technique'],['check','12 · Check'],['exit','13 · Exit']
 ];
 $('#lessonPanel').innerHTML =
  '<span class="eyebrow">'+l.code+'</span><h2>'+l.title+'</h2><p class="lesson-lead">'+l.lead+'</p>'+
  '<div>'+l.formulas.map(f=>'<span class="formula-chip">'+f+'</span>').join('')+'</div>'+
  '<div class="spec-coverage"><strong>AQA coverage:</strong> This lesson is mapped to '+l.code+' and includes the examinable content, mathematical treatment and practical/graph skills relevant to this part of Mechanics & Materials.</div>'+readinessHtml(l.id)+
  '<div class="chunk-strip">'+chunks.map((c,i)=>'<button class="chunk-button '+(i===0?'active':'')+'" data-chunk="'+c[0]+'">'+c[1]+'</button>').join('')+'</div>'+
  lessonChunk('Retrieval starter', 'retrieval', retrieval, true)+
  lessonChunk('Learning objectives','objectives',objectives)+
  lessonChunk('Core teaching','core',core)+
  lessonChunk('Guided textbook: teach → think → do','textbook',textbook)+
  lessonChunk('Key vocabulary','terms',terms)+
  lessonChunk('AQA specification depth','depth',depth)+
  lessonChunk('AQA applications and connections','connections',connections)+
  lessonChunk('Worked examples','worked',worked)+
  lessonChunk('Auto-marked practice','practice',practice)+
  lessonChunk('Apply it','task',task)+
  lessonChunk('Exam technique and misconceptions','technique',technique)+
  lessonChunk('Knowledge check','check',check)+
  lessonChunk('Exit ticket','exit',exit)+
  '<div class="lesson-actions"><button class="button primary" id="completeLesson">'+(completed.has(l.id)?'Completed ✓':'Mark lesson complete')+'</button><button class="button" id="openLessonSim">Open linked simulation</button>'+(activeLesson<lessons.length-1?'<button class="button" id="nextLessonBtn">Next lesson →</button>':'')+'</div>';

 $$('.chunk-button',$('#lessonPanel')).forEach(b=>b.addEventListener('click',()=>{
  $$('.chunk-button',$('#lessonPanel')).forEach(x=>x.classList.remove('active'));
  $$('.chunk',$('#lessonPanel')).forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  $('[data-chunk-panel="'+b.dataset.chunk+'"]',$('#lessonPanel')).classList.add('active');
 }));
 $$('.reveal-answer',$('#lessonPanel')).forEach(b=>b.addEventListener('click',()=>{
  const ans=b.nextElementSibling; ans.classList.toggle('visible'); b.textContent=ans.classList.contains('visible')?'Hide answer':'Show answer';
 }));
 $$('.student-answer',$('#lessonPanel')).forEach(t=>t.addEventListener('input',()=>{
   const data=JSON.parse(localStorage.getItem('mechanicsLessonAnswers')||'{}');
   data[t.dataset.answerKey]=t.value;
   localStorage.setItem('mechanicsLessonAnswers',JSON.stringify(data));
 }));
 bindLessonPractice(l);
 $$('.mini-option',$('#lessonPanel')).forEach(b=>b.addEventListener('click',()=>{
  const all=$$('.mini-option',$('#lessonPanel')); all.forEach(x=>{x.disabled=true;x.classList.remove('correct','wrong')});
  const chosen=Number(b.dataset.mini); b.classList.add(chosen===l.check.answer?'correct':'wrong'); all[l.check.answer].classList.add('correct');
  const fb=$('[data-mini-feedback]',$('#lessonPanel')); fb.classList.remove('hidden'); fb.textContent=(chosen===l.check.answer?'Correct. ':'Not quite. ')+l.check.explain;
  recordMastery(masteryCodeForLesson(l),chosen===l.check.answer);
  setLessonCheckpoint(l.id,'check',chosen===l.check.answer);
 }));
 $('#completeLesson').addEventListener('click',()=>{
  if(completed.has(l.id)) completed.delete(l.id); else completed.add(l.id);
  saveProgress();renderCourseList();renderLesson();
 });
 $('#openLessonSim').addEventListener('click',()=>{openView('lab');setSimById(l.sim);});
 if($('#nextLessonBtn')) $('#nextLessonBtn').addEventListener('click',()=>{activeLesson++;renderCourseList();renderLesson();window.scrollTo({top:250,behavior:'smooth'});});
}

function openView(name){
 $$('.view').forEach(v=>v.classList.toggle('active-view',v.id==='view-'+name));
 $$('.nav-button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
 if(name==='lab'){
  requestAnimationFrame(()=>{
   try{
    syncSimCanvas();
    drawSimSafely();
   }catch(error){
    showSimError(error);
   }
  });
 }
}
$$('.nav-button').forEach(b=>b.addEventListener('click',()=>openView(b.dataset.view)));
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>openView(b.dataset.jump)));
$('#resetProgress').addEventListener('click',()=>{completed.clear();saveProgress();renderCourseList();renderLesson();});

const sims = [
{id:'vectors',code:'3.4.1.1',title:'Vector components',subtitle:'Resolve a vector and see its perpendicular components.',controls:[
 {key:'mag',label:'Vector magnitude / N',min:10,max:100,step:1,value:60},
 {key:'angle',label:'Angle above horizontal / °',min:0,max:90,step:1,value:35}
],simple:'A vector can be replaced by perpendicular horizontal and vertical components with exactly the same combined effect.',exam:'For an angle measured from the horizontal, use Fₓ = F cosθ and Fᵧ = F sinθ. State the direction of the final vector.',mistake:'Do not decide sine/cosine from memory alone; identify the adjacent and opposite sides relative to the stated angle.',check:['At 0°, which component equals the full vector?','The horizontal component.'],investigate:'Set 30°, 45° and 60°. Compare how the two components change while the vector magnitude stays fixed.'},
{id:'equilibrium',code:'3.4.1.1',title:'Three-force equilibrium',subtitle:'Build a closed vector triangle for three coplanar forces acting at a point.',controls:[
 {key:'f1',label:'Force 1 / N',min:10,max:100,step:2,value:50},
 {key:'a1',label:'Force 1 angle / °',min:0,max:180,step:5,value:20},
 {key:'f2',label:'Force 2 / N',min:10,max:100,step:2,value:65},
 {key:'a2',label:'Force 2 angle / °',min:0,max:180,step:5,value:125}
],simple:'For equilibrium the third force must be equal and opposite to the resultant of the first two forces.',exam:'For three coplanar forces in equilibrium, the vector sum is zero. The three vectors form a closed triangle when placed head-to-tail.',mistake:'Equilibrium means zero resultant force, not zero individual forces.',check:['What must the vector sum of forces equal in equilibrium?','Zero.'],investigate:'Change both angles and compare the magnitude/direction of the balancing third force.'},
{id:'moments',code:'3.4.1.2',title:'Moments and balance',subtitle:'Change force and perpendicular distance to see the turning effect.',controls:[
 {key:'force',label:'Applied force / N',min:10,max:120,step:5,value:60},
 {key:'distance',label:'Perpendicular distance / m',min:.1,max:1.2,step:.05,value:.6}
],simple:'Moment increases when either force or perpendicular distance from the pivot increases.',exam:'Moment about a point = force × perpendicular distance from the point to the force’s line of action.',mistake:'The distance is to the line of action, not simply the distance to where the force is applied.',check:['What happens to the moment if distance doubles at fixed force?','The moment doubles.'],investigate:'Keep the moment at about 36 N m using at least three different force–distance combinations.'},
{id:'couplecom',code:'3.4.1.2',title:'Couples + centre of mass',subtitle:'Compare a pure couple with weight acting through a movable centre of mass.',controls:[
 {key:'force',label:'Couple force / N',min:5,max:80,step:5,value:30},
 {key:'sep',label:'Force separation / m',min:.10,max:1.00,step:.05,value:.50},
 {key:'com',label:'Centre-of-mass offset / m',min:-.50,max:.50,step:.05,value:0}
],simple:'A couple has zero resultant force but causes rotation. Weight acts through the centre of mass and can create a moment if its line of action misses the pivot.',exam:'Moment of a couple = one force × perpendicular separation. For a uniform regular solid, centre of mass is at the geometric centre.',mistake:'Do not multiply a couple moment by two; F × separation already gives the total couple moment.',check:['Does a pure couple have a resultant force?','No. It has zero resultant force but a non-zero moment.'],investigate:'Double the separation while keeping force fixed, then move the centre of mass either side of the pivot.'},
{id:'motion',code:'3.4.1.3',title:'Motion + graph links',subtitle:'Watch position and velocity evolve while the live velocity–time graph builds.',controls:[
 {key:'u',label:'Initial velocity / m s⁻¹',min:-10,max:25,step:1,value:4},
 {key:'a',label:'Acceleration / m s⁻²',min:-5,max:5,step:.5,value:2}
],simple:'Constant acceleration changes velocity by the same amount each second. The live graph shows this as a straight line.',exam:'For constant acceleration, v = u + at and s = ut + ½at². Gradient of the v–t graph is acceleration; area is displacement.',mistake:'SUVAT is not valid over an interval in which acceleration changes.',check:['If a = 0, what happens to the velocity–time graph?','It becomes horizontal because velocity is constant.'],investigate:'Try positive, zero and negative acceleration. Predict the graph gradient and whether the object changes direction.'},
{id:'bounce',code:'3.4.1.3',title:'Bouncing-ball graphs',subtitle:'Link repeated bounces to velocity–time and acceleration ideas.',controls:[
 {key:'drop',label:'Initial drop height / m',min:.5,max:5,step:.25,value:2.5},
 {key:'retain',label:'Speed retained after bounce / %',min:30,max:95,step:5,value:70}
],simple:'Between impacts the ball accelerates downward at approximately g. At each collision the velocity reverses rapidly and usually has a smaller magnitude.',exam:'On a velocity–time graph, free-flight sections have constant gradient −g if upward is positive. The collision gives a rapid velocity change and large impulse.',mistake:'Velocity can change sign instantly in an idealised collision model; acceleration between impacts is still due to gravity.',check:['What is the gradient of the free-flight sections of a v–t graph if upward is positive?','Approximately −g.'],investigate:'Reduce the retained-speed percentage and observe how bounce heights and successive velocity peaks change.'},
{id:'projectile',code:'3.4.1.4',title:'Projectile motion + drag',subtitle:'Compare ideal motion with a simple linear-drag model and inspect velocity components.',controls:[
 {key:'speed',label:'Launch speed / m s⁻¹',min:5,max:35,step:1,value:20},
 {key:'angle',label:'Launch angle / °',min:5,max:85,step:1,value:45},
 {key:'drag',label:'Linear drag constant / s⁻¹',min:0,max:.20,step:.01,value:0}
],simple:'Horizontal and vertical components share the same time. Without drag, only the vertical component accelerates. Drag reduces both components.',exam:'Resolve the launch velocity, solve vertical and horizontal motion separately, and use the same time. Treat lift/drag qualitatively unless a model is supplied.',mistake:'At maximum height vertical velocity is zero, but acceleration is still downward.',check:['Without drag, what is horizontal acceleration?','Zero.'],investigate:'Compare the same launch with drag = 0 and drag > 0. Note the change in range, peak height and symmetry.'},
{id:'terminal',code:'3.4.1.4',title:'Terminal speed',subtitle:'Watch drag increase with speed until it balances weight.',controls:[
 {key:'mass',label:'Mass / kg',min:.2,max:5,step:.2,value:1.2},
 {key:'k',label:'Linear drag coefficient / N s m⁻¹',min:.5,max:12,step:.5,value:3}
],simple:'As speed increases, drag grows. The resultant force becomes smaller until drag equals weight and acceleration becomes zero.',exam:'Terminal speed occurs when the resistive force balances the driving force, so resultant force and acceleration are zero.',mistake:'Terminal speed does not mean no forces act; the forces are balanced.',check:['At terminal speed, what is the resultant force?','Zero.'],investigate:'Increase mass, then increase drag coefficient. Predict which change increases the terminal speed in this teaching model.'},
{id:'vehicle',code:'3.4.1.4',title:'Vehicle maximum speed',subtitle:'See resistive force rise with speed until it balances the driving force.',controls:[
 {key:'drive',label:'Driving force / N',min:500,max:8000,step:250,value:3500},
 {key:'drag',label:'Drag coefficient / N per (m s⁻¹)²',min:.5,max:12,step:.5,value:4},
 {key:'roll',label:'Rolling resistance / N',min:0,max:1000,step:50,value:350},
 {key:'mass',label:'Vehicle mass / kg',min:500,max:2200,step:100,value:1200}
],simple:'As speed rises, aerodynamic drag rises strongly. Maximum steady speed occurs when total resistance equals driving force.',exam:'At maximum steady speed the resultant force is zero, so acceleration is zero even though velocity is not.',mistake:'Maximum speed is not reached because the driving force becomes zero; it is reached when driving force and resistance balance.',check:['At maximum steady speed, what is the acceleration?','Zero.'],investigate:'Increase drag coefficient or rolling resistance and observe how the maximum speed changes.'},
{id:'newton',code:'3.4.1.5',title:'Newton’s laws + free-body view',subtitle:'See driving force, resistance, resultant force and acceleration together.',controls:[
 {key:'drive',label:'Driving force / N',min:0,max:5000,step:100,value:3000},
 {key:'resist',label:'Resistance / N',min:0,max:2500,step:100,value:800},
 {key:'mass',label:'Mass / kg',min:500,max:2000,step:50,value:1200}
],simple:'Acceleration depends on the resultant force. Equal driving and resistive forces produce zero acceleration, not necessarily zero velocity.',exam:'Construct a free-body diagram, choose a positive direction, calculate ΣF, then use ΣF = ma for constant mass.',mistake:'Do not put the driving force into F = ma without subtracting opposing forces.',check:['If resultant force is zero, what is acceleration?','Zero.'],investigate:'Keep the resultant force fixed while changing mass. Check the inverse relationship between mass and acceleration.'},
{id:'momentum',code:'3.4.1.6',title:'Momentum collision',subtitle:'Model a one-dimensional perfectly inelastic collision and compare momentum with kinetic energy.',controls:[
 {key:'m1',label:'Mass 1 / kg',min:.5,max:4,step:.5,value:1},
 {key:'v1',label:'Velocity 1 / m s⁻¹',min:-8,max:8,step:1,value:5},
 {key:'m2',label:'Mass 2 / kg',min:.5,max:4,step:.5,value:2},
 {key:'v2',label:'Velocity 2 / m s⁻¹',min:-8,max:8,step:1,value:0}
],simple:'When the trolleys stick, total momentum is unchanged if external impulse is negligible, but kinetic energy usually decreases.',exam:'Use signed velocities: m₁u₁ + m₂u₂ = (m₁+m₂)v for a sticking collision.',mistake:'Momentum conservation does not imply kinetic-energy conservation.',check:['What is conserved in both elastic and inelastic collisions in a closed system?','Total momentum.'],investigate:'Try collisions with one trolley moving in the negative direction. Check that signs are essential.'},
{id:'impulse',code:'3.4.1.6',title:'Force–time impulse graph',subtitle:'Change peak force and contact time; the shaded area is impulse.',controls:[
 {key:'peak',label:'Peak force / N',min:100,max:5000,step:100,value:2400},
 {key:'time',label:'Contact time / s',min:.01,max:.30,step:.01,value:.08},
 {key:'mass',label:'Object mass / kg',min:.1,max:5,step:.1,value:.8}
],simple:'Impulse is the area under a force–time graph. For the triangular pulse shown, J = ½ × peak force × contact time.',exam:'Area under an F–t graph = impulse = Δp. For a given Δp, increasing contact time reduces the average force.',mistake:'Area under force–time is not work; work comes from a force–displacement graph.',check:['What physical quantity is represented by area under an F–t graph?','Impulse, equal to change in momentum.'],investigate:'Keep impulse roughly constant while increasing contact time. Observe how the peak force can be reduced.'},
{id:'energy',code:'3.4.1.7–8',title:'Energy transfer on a track',subtitle:'Track GPE, KE and dissipated energy throughout the motion.',controls:[
 {key:'height',label:'Starting height / m',min:.5,max:8,step:.5,value:4},
 {key:'mass',label:'Mass / kg',min:.5,max:5,step:.5,value:2},
 {key:'loss',label:'Energy dissipated / %',min:0,max:60,step:5,value:10}
],simple:'As height decreases, GPE can transfer to KE. Resistive forces transfer some energy to internal stores while total energy is conserved.',exam:'Write an energy balance and include work done against resistive forces. Mechanical energy can decrease while total energy remains conserved.',mistake:'Do not say energy is lost; identify where it is transferred.',check:['If no energy is dissipated, what happens to the lost GPE in this model?','It becomes kinetic energy.'],investigate:'Compare 0%, 20% and 50% dissipation. Relate the final speed to the energy available for KE.'},
{id:'workgraph',code:'3.4.1.7',title:'Variable force + work graph',subtitle:'The shaded area under force–displacement gives work done.',controls:[
 {key:'f0',label:'Starting force / N',min:0,max:120,step:5,value:20},
 {key:'f1',label:'Final force / N',min:0,max:120,step:5,value:80},
 {key:'distance',label:'Displacement / m',min:.5,max:8,step:.5,value:4}
],simple:'When force changes with displacement, work is found from the area under the force–displacement graph.',exam:'For a straight-line change in force, the area is a trapezium: W = ½(F₀ + F₁)s.',mistake:'Do not multiply the final force by distance unless the force is constant at that value.',check:['What does area under an F–s graph represent?','Work done / energy transferred.'],investigate:'Set F₀ = F₁ to recover the constant-force case, then compare with a changing-force case.'},
{id:'motor',code:'3.4.1.7',title:'Motor efficiency lifting a mass',subtitle:'Compare electrical input power with useful gravitational output power.',controls:[
 {key:'mass',label:'Lifted mass / kg',min:1,max:30,step:1,value:10},
 {key:'height',label:'Lift height / m',min:.5,max:5,step:.25,value:2},
 {key:'time',label:'Lift time / s',min:1,max:12,step:.5,value:4},
 {key:'input',label:'Electrical input power / W',min:100,max:1500,step:50,value:650}
],simple:'The motor transfers electrical energy. Some becomes useful gravitational potential energy and the rest is dissipated, mainly as heating and sound.',exam:'Useful output power = mgh/t. Efficiency = useful output power ÷ input power.',mistake:'Efficiency compares like with like: power/power or energy/energy.',check:['Can efficiency exceed 100% for an ordinary motor?','No. Useful output cannot exceed total input.'],investigate:'Change the lift time and input power while keeping mass and height fixed. Identify conditions that raise or lower calculated efficiency.'},
{id:'springenergy',code:'3.4.2.1',title:'Spring energy + Hooke’s law',subtitle:'Build a force–extension graph and connect its area to elastic strain energy.',controls:[
 {key:'k',label:'Spring constant / N m⁻¹',min:20,max:500,step:20,value:160},
 {key:'ext',label:'Extension / m',min:0,max:.30,step:.01,value:.12},
 {key:'limit',label:'Proportional limit / m',min:.05,max:.25,step:.01,value:.18}
],simple:'In the Hookean region, force is proportional to extension and elastic strain energy is the triangular area under the force–extension graph.',exam:'For a linear spring E = ½FΔL = ½k(ΔL)². Beyond the proportional region, the simple linear equation is no longer valid.',mistake:'Extension is the change in length, not the total stretched length.',check:['What does area under a force–extension graph represent?','Work done / elastic strain energy transferred to the spring.'],investigate:'Change k and extension. Then move beyond the proportional limit and compare the curve with the straight Hookean region.'},
{id:'collisiontypes',code:'3.4.1.6',title:'Elastic, inelastic + explosion',subtitle:'Compare momentum and kinetic energy across different interaction types.',controls:[
 {key:'m1',label:'Mass 1 / kg',min:.5,max:4,step:.5,value:1},
 {key:'m2',label:'Mass 2 / kg',min:.5,max:4,step:.5,value:1.5},
 {key:'speed',label:'Initial/launch speed scale / m s⁻¹',min:1,max:8,step:.5,value:4},
 {key:'mode',label:'Interaction mode: 0 stick, 1 elastic, 2 explosion',min:0,max:2,step:1,value:1}
],simple:'Momentum is conserved in all three closed-system interactions. Kinetic energy is conserved only in the ideal elastic collision; an explosion can increase kinetic energy by converting internal energy.',exam:'Apply signed momentum before = momentum after. Then compare kinetic energies separately to classify the interaction.',mistake:'Momentum conservation does not require kinetic-energy conservation.',check:['Which interaction conserves total kinetic energy as well as momentum?','An ideal elastic collision.'],investigate:'Switch among modes 0, 1 and 2 and compare total momentum and kinetic energy before/after.'},
{id:'density',code:'3.4.2.1',title:'Density and sample dimensions',subtitle:'Relate mass and volume and see how dimensions determine bulk density.',controls:[
 {key:'mass',label:'Mass / g',min:20,max:1000,step:10,value:270},
 {key:'length',label:'Length / cm',min:1,max:12,step:.5,value:5},
 {key:'width',label:'Width / cm',min:1,max:10,step:.5,value:4},
 {key:'height',label:'Height / cm',min:1,max:10,step:.5,value:2.5}
],simple:'Density is mass divided by volume. For a cuboid, volume is length × width × height.',exam:'Convert mass to kg and dimensions to metres before using ρ=m/V in SI units.',mistake:'A volume conversion is cubed: 1 cm³ = 10⁻⁶ m³.',check:['What is the SI unit of density?','kg m⁻³.'],investigate:'Double one dimension while keeping mass fixed. Predict and check how density changes in this model.'},
{id:'elasticity',code:'3.4.2.1–2',title:'Elastic wire + Young modulus',subtitle:'Link force, area and original length to stress, strain and extension.',controls:[
 {key:'force',label:'Tension / N',min:0,max:120,step:5,value:50},
 {key:'length',label:'Original length / m',min:.5,max:3,step:.1,value:1.5},
 {key:'area',label:'Area / mm²',min:.1,max:1.2,step:.05,value:.4},
 {key:'young',label:'Young modulus / GPa',min:20,max:220,step:10,value:200}
],simple:'Stress compares force with area; strain compares extension with original length. Young modulus measures stiffness in the linear elastic region.',exam:'E = stress/strain = FL/(AΔL). Young modulus is the gradient of the linear stress–strain region.',mistake:'Convert mm² to m² and keep original length separate from extension.',check:['What does a larger Young modulus mean?','A stiffer material.'],investigate:'Double the original length, then double the area. Predict how extension changes for the same force and material.'},
{id:'stressstrain',code:'3.4.2.1–2',title:'Stress–strain material behaviour',subtitle:'Move through elastic, plastic and fracture regions on a simplified material curve.',controls:[
 {key:'strain',label:'Applied strain',min:0,max:.080,step:.001,value:.010},
 {key:'young',label:'Young modulus / GPa',min:20,max:220,step:10,value:120},
 {key:'yield',label:'Yield stress / MPa',min:80,max:500,step:20,value:240},
 {key:'break',label:'Breaking strain',min:.025,max:.100,step:.005,value:.070}
],simple:'The initial straight region is elastic. Beyond yield, a ductile teaching model shows plastic deformation until fracture.',exam:'Young modulus is the gradient of the initial linear stress–strain graph. Strength and stiffness are different properties.',mistake:'A material with a high Young modulus is stiff, but that alone does not tell you its breaking stress.',check:['What does the initial stress–strain gradient represent?','Young modulus.'],investigate:'Compare high and low Young modulus while keeping yield stress similar. Then change breaking strain to model more or less ductile behaviour.'}
];

const simTeaching = {
 vectors:{watch:'Watch how the horizontal and vertical components change while their vector sum remains the original force.',assume:'The components are perpendicular and the diagram is rescaled for clarity.'},
 equilibrium:{watch:'The third vector closes the triangle exactly, showing that the vector sum is zero.',assume:'Forces act at one point in one plane; rope/pulley masses and friction are ignored.'},
 moments:{watch:'Moment grows in direct proportion to either force or perpendicular distance.',assume:'The beam is rigid and the displayed force acts perpendicular to it.'},
 couplecom:{watch:'A pure couple produces rotation with zero resultant force. Moving the centre of mass changes the weight moment about the pivot.',assume:'The body is rigid and weight is represented as a single force through the centre of mass.'},
 motion:{watch:'Compare the moving object with the velocity–time line: graph gradient is acceleration and signed area is displacement.',assume:'Acceleration is constant throughout each run.'},
 bounce:{watch:'Free-flight sections have gradient approximately −g; impacts reverse velocity quickly and reduce the next peak speed.',assume:'Air resistance and finite collision duration are simplified; the retained-speed control is a teaching model.'},
 projectile:{watch:'Separate horizontal and vertical velocity vectors. Adding drag shortens the range and destroys the ideal symmetry.',assume:'Gravity is uniform. The optional drag uses a simplified linear model rather than a full aerodynamic calculation.'},
 terminal:{watch:'Drag increases with speed, shrinking the resultant force until acceleration tends toward zero.',assume:'Drag is modelled as proportional to speed so the approach to terminal speed is easy to see.'},
 vehicle:{watch:'The resistive-force curve rises with speed until it crosses the driving-force line: that intersection is the maximum steady speed.',assume:'Driving force is constant and aerodynamic drag is represented by a quadratic speed term plus constant rolling resistance.'},
 newton:{watch:'The acceleration arrow follows the resultant force, not the driving force alone. Increasing mass reduces acceleration for fixed resultant force.',assume:'Mass is constant and motion is one-dimensional.'},
 momentum:{watch:'Total signed momentum is unchanged in the sticking collision while kinetic energy falls.',assume:'External impulse during the short collision is negligible.'},
 impulse:{watch:'The shaded force–time area is impulse. A wider pulse can give the same impulse with a lower peak force.',assume:'The pulse is triangular so its area can be calculated exactly with ½bh.'},
 collisiontypes:{watch:'Momentum stays the same in all closed-system modes; kinetic energy behaves differently for sticking, elastic and explosion cases.',assume:'Interactions are one-dimensional and external impulse is negligible. The explosion converts stored internal energy into kinetic energy.'},
 energy:{watch:'GPE decreases while KE grows; the dissipated bar accounts for energy transferred away from mechanical stores.',assume:'The percentage-loss control is a teaching simplification rather than a detailed friction law.'},
 workgraph:{watch:'The shaded area beneath the force–displacement line is the work done, including when force varies.',assume:'Force changes linearly with displacement between the two chosen endpoints.'},
 motor:{watch:'Compare electrical input energy with useful GPE. The difference is the dissipated transfer and determines efficiency.',assume:'The lift speed is represented by the chosen height/time; motor start-up transients are ignored.'},
 density:{watch:'Changing any dimension changes volume. Density only changes if mass and volume change in different proportions.',assume:'The sample is a uniform cuboid.'},
 springenergy:{watch:'The initial force–extension line is Hookean. Area under the graph is energy transferred; beyond the proportional limit the graph bends.',assume:'The non-linear region is illustrative and is not a material-specific constitutive model.'},
 elasticity:{watch:'For the same material, longer wires extend more and larger cross-sectional areas extend less. Stress–strain slope is Young modulus.',assume:'The wire stays in the linear elastic region.'},
 stressstrain:{watch:'Use the initial gradient for stiffness, the plastic region for ductility and the final point for fracture behaviour.',assume:'The post-yield curve is a simplified ductile-material model for teaching graph interpretation.'}
};

const simEnhancements = {
 vectors:{
  knowledge:['Scalars have magnitude only; vectors also have direction.','Perpendicular components recombine to the original vector.','For an angle from the horizontal: Fₓ=Fcosθ and Fᵧ=Fsinθ.','A complete vector answer includes both magnitude and direction.'],
  presets:[
   {label:'45° equal components',values:{mag:60,angle:45}},
   {label:'Mostly horizontal',values:{mag:80,angle:15}},
   {label:'Mostly vertical',values:{mag:80,angle:75}}
  ],
  challenge:{text:'Make the two perpendicular components equal to within 0.5 N.',check:(v)=>Math.abs(v.mag*Math.cos(v.angle*Math.PI/180)-v.mag*Math.sin(v.angle*Math.PI/180))<=.5}
 },
 equilibrium:{
  knowledge:['Equilibrium means the vector sum of all forces is zero.','An object in equilibrium may be at rest or moving at constant velocity.','Three coplanar forces at a point can be represented by a closed vector triangle.','The third force is equal and opposite to the resultant of the other two.'],
  presets:[
   {label:'Near cancellation',values:{f1:60,a1:0,f2:60,a2:180}},
   {label:'Right-angle forces',values:{f1:50,a1:0,f2:50,a2:90}},
   {label:'Oblique triangle',values:{f1:70,a1:30,f2:55,a2:140}}
  ],
  challenge:{text:'Adjust the first two forces so the balancing third force is below 10 N.',check:(v)=>{const r1=v.a1*Math.PI/180,r2=v.a2*Math.PI/180;return Math.hypot(v.f1*Math.cos(r1)+v.f2*Math.cos(r2),v.f1*Math.sin(r1)+v.f2*Math.sin(r2))<10}}
 },
 moments:{
  knowledge:['Moment = force × perpendicular distance from pivot to line of action.','Moment is measured in N m.','For rotational equilibrium, clockwise moment = anticlockwise moment.','Increasing either force or perpendicular distance increases the turning effect.'],
  presets:[
   {label:'36 N m',values:{force:60,distance:.6}},
   {label:'Large force, short arm',values:{force:120,distance:.3}},
   {label:'Small force, long arm',values:{force:30,distance:1.2}}
  ],
  challenge:{text:'Create a moment of 36 N m to within 0.5 N m.',check:(v)=>Math.abs(v.force*v.distance-36)<=.5}
 },
 couplecom:{
  knowledge:['A couple is two equal, opposite, parallel forces on different lines of action.','A couple has zero resultant force but a non-zero turning effect.','Moment of a couple = one force × perpendicular separation.','Weight can be treated as acting through the centre of mass.'],
  presets:[
   {label:'Pure couple 15 N m',values:{force:30,sep:.5,com:0}},
   {label:'COM right of pivot',values:{force:30,sep:.5,com:.3}},
   {label:'Wide couple',values:{force:20,sep:.9,com:0}}
  ],
  challenge:{text:'Set the centre of mass exactly over the pivot and make the couple moment 20 N m.',check:(v)=>Math.abs(v.com)<.001&&Math.abs(v.force*v.sep-20)<.6}
 },
 motion:{
  knowledge:['Gradient of displacement–time = velocity.','Gradient of velocity–time = acceleration.','Area under velocity–time = displacement.','Area under acceleration–time = change in velocity.'],
  presets:[
   {label:'Speeding up',values:{u:4,a:2}},
   {label:'Constant velocity',values:{u:10,a:0}},
   {label:'Stop then reverse',values:{u:12,a:-3}}
  ],
  challenge:{text:'Choose u and a so the object stops between 3.5 s and 4.5 s.',check:(v)=>v.a<0&&(-v.u/v.a)>=3.5&&(-v.u/v.a)<=4.5}
 },
 bounce:{
  knowledge:['Between bounces, acceleration is approximately constant at g downward.','If upward is positive, free-flight v–t sections have gradient −g.','Impact causes a rapid velocity reversal and a large impulse.','Lower rebound speed gives lower subsequent peak height.'],
  presets:[
   {label:'High rebound',values:{drop:3,retain:90}},
   {label:'Medium rebound',values:{drop:3,retain:70}},
   {label:'Heavy damping',values:{drop:3,retain:40}}
  ],
  challenge:{text:'Make the second peak height less than 1.0 m while starting from at least 2.5 m.',check:(v)=>v.drop>=2.5&&v.drop*Math.pow(v.retain/100,2)<1}
 },
 projectile:{
  knowledge:['Horizontal and vertical motion share the same time but can be analysed independently.','Without drag, horizontal acceleration is zero and vertical acceleration is −g.','At maximum height, vertical velocity is zero but acceleration is still −g.','Air resistance reduces range and destroys ideal trajectory symmetry.'],
  presets:[
   {label:'Ideal 45°',values:{speed:20,angle:45,drag:0}},
   {label:'Low-angle fast',values:{speed:28,angle:25,drag:0}},
   {label:'With drag',values:{speed:20,angle:45,drag:.12}}
  ],
  challenge:{text:'With zero drag, set a launch that has horizontal and vertical initial velocity components equal.',check:(v)=>v.drag===0&&Math.abs(v.speed*Math.cos(v.angle*Math.PI/180)-v.speed*Math.sin(v.angle*Math.PI/180))<.5}
 },
 terminal:{
  knowledge:['Weight is constant while drag increases with speed.','Resultant force decreases as drag approaches weight.','Terminal speed occurs when drag = weight.','At terminal speed acceleration is zero, but the object continues moving.'],
  presets:[
   {label:'Light / high drag',values:{mass:.6,k:6}},
   {label:'Default',values:{mass:1.2,k:3}},
   {label:'Heavy / low drag',values:{mass:3,k:1.5}}
  ],
  challenge:{text:'Adjust mass and drag so terminal speed is between 4.5 and 5.5 m s⁻¹.',check:(v)=>{const vt=v.mass*9.81/v.k;return vt>=4.5&&vt<=5.5}}
 },
 vehicle:{
  knowledge:['Aerodynamic drag increases strongly with speed.','Maximum steady speed occurs where total resistance equals driving force.','At maximum steady speed, resultant force and acceleration are zero.','Increasing drag or rolling resistance reduces maximum speed for the same drive force.'],
  presets:[
   {label:'Low drag',values:{drive:3500,drag:2,roll:250,mass:1200}},
   {label:'High drag',values:{drive:3500,drag:8,roll:350,mass:1200}},
   {label:'High drive',values:{drive:6500,drag:4,roll:350,mass:1200}}
  ],
  challenge:{text:'Tune the vehicle for a maximum steady speed between 25 and 30 m s⁻¹.',check:(v)=>{const vm=Math.sqrt(Math.max(0,(v.drive-v.roll)/v.drag));return vm>=25&&vm<=30}}
 },
 newton:{
  knowledge:['Newton I: zero resultant force means constant velocity.','Newton II for constant mass: ΣF=ma.','Newton III pairs act on different interacting objects.','A free-body diagram contains only forces acting on the chosen object.'],
  presets:[
   {label:'Balanced forces',values:{drive:1800,resist:1800,mass:1200}},
   {label:'Forward acceleration',values:{drive:3600,resist:900,mass:1200}},
   {label:'Large mass',values:{drive:3600,resist:900,mass:2000}}
  ],
  challenge:{text:'Create exactly zero acceleration while non-zero forces still act.',check:(v)=>v.drive>0&&v.resist>0&&Math.abs(v.drive-v.resist)<1}
 },
 momentum:{
  knowledge:['Momentum p=mv is a vector, so direction/sign matters.','Total linear momentum is conserved in a closed system.','Sticking collisions are perfectly inelastic.','Momentum can be conserved even when kinetic energy decreases.'],
  presets:[
   {label:'Moving hits stationary',values:{m1:1,v1:5,m2:2,v2:0}},
   {label:'Head-on',values:{m1:1,v1:5,m2:1,v2:-5}},
   {label:'Unequal masses',values:{m1:3,v1:4,m2:1,v2:-2}}
  ],
  challenge:{text:'Make the joined trolleys finish almost at rest (|v| < 0.2 m s⁻¹).',check:(v)=>Math.abs((v.m1*v.v1+v.m2*v.v2)/(v.m1+v.m2))<.2}
 },
 impulse:{
  knowledge:['Impulse = change in momentum.','Impulse equals the area under a force–time graph.','For a triangular pulse, J=½FpeakΔt.','For the same Δp, increasing contact time reduces average/peak force.'],
  presets:[
   {label:'Short hard impact',values:{peak:4000,time:.04,mass:.8}},
   {label:'Long softer impact',values:{peak:1000,time:.16,mass:.8}},
   {label:'Same impulse pair',values:{peak:2000,time:.08,mass:.8}}
  ],
  challenge:{text:'Create an impulse between 75 and 85 N s.',check:(v)=>{const J=.5*v.peak*v.time;return J>=75&&J<=85}}
 },
 energy:{
  knowledge:['Energy is conserved overall but can transfer between stores.','Near Earth, ΔGPE=mgΔh.','Kinetic energy = ½mv².','Resistive forces transfer energy into internal stores/surroundings.'],
  presets:[
   {label:'Ideal transfer',values:{height:4,mass:2,loss:0}},
   {label:'Moderate losses',values:{height:4,mass:2,loss:20}},
   {label:'Large losses',values:{height:4,mass:2,loss:50}}
  ],
  challenge:{text:'Set the model so exactly half of the initial GPE remains available for final KE.',check:(v)=>Math.abs(v.loss-50)<.1}
 },
 workgraph:{
  knowledge:['Work done is energy transferred by a force through a displacement.','For variable force, work is area under the force–displacement graph.','A straight-line force change gives a trapezium area.','For constant force parallel to motion, W=Fs.'],
  presets:[
   {label:'Constant force',values:{f0:50,f1:50,distance:4}},
   {label:'Increasing force',values:{f0:20,f1:80,distance:4}},
   {label:'Decreasing force',values:{f0:100,f1:20,distance:4}}
  ],
  challenge:{text:'Create exactly 200 J of work to within 2 J.',check:(v)=>Math.abs(.5*(v.f0+v.f1)*v.distance-200)<=2}
 },
 motor:{
  knowledge:['Useful output energy when lifting is mgh.','Useful output power = mgh/t.','Efficiency = useful output power ÷ input power.','Random and systematic errors should be considered in motor-efficiency investigations.'],
  presets:[
   {label:'Efficient setup',values:{mass:20,height:2,time:4,input:300}},
   {label:'Lower efficiency',values:{mass:10,height:2,time:5,input:650}},
   {label:'Fast lift',values:{mass:10,height:2,time:2,input:650}}
  ],
  challenge:{text:'Tune the motor to an efficiency between 60% and 80% without exceeding 100%.',check:(v)=>{const e=100*(v.mass*9.81*v.height/v.time)/v.input;return e>=60&&e<=80}}
 },
 springenergy:{
  knowledge:['Within the proportional region, F=kΔL.','Spring constant k is stiffness in N m⁻¹.','Area under the F–extension graph is elastic strain energy.','For a Hookean spring, E=½FΔL=½k(ΔL)².'],
  presets:[
   {label:'Soft spring',values:{k:80,ext:.12,limit:.18}},
   {label:'Stiff spring',values:{k:320,ext:.12,limit:.18}},
   {label:'Beyond proportional limit',values:{k:160,ext:.24,limit:.18}}
  ],
  challenge:{text:'Store more than 2 J while remaining inside the proportional region.',check:(v)=>v.ext<=v.limit&&.5*v.k*v.ext*v.ext>2}
 },
 collisiontypes:{
  knowledge:['Momentum is conserved in all closed-system collision/explosion examples.','An ideal elastic collision also conserves total kinetic energy.','A perfectly inelastic collision loses kinetic energy from the moving objects.','An explosion converts internal energy into kinetic energy.'],
  presets:[
   {label:'Sticking',values:{m1:1,m2:1.5,speed:4,mode:0}},
   {label:'Elastic',values:{m1:1,m2:1.5,speed:4,mode:1}},
   {label:'Explosion',values:{m1:1,m2:1.5,speed:4,mode:2}}
  ],
  challenge:{text:'Select the interaction that conserves both total momentum and total kinetic energy.',check:(v)=>Math.round(v.mode)===1}
 },
 density:{
  knowledge:['Density ρ=m/V.','For a cuboid, V=lwh.','Convert g→kg and cm³→m³ for SI density.','Density compares mass per unit volume, not simply “heaviness”.'],
  presets:[
   {label:'≈ water',values:{mass:100,length:5,width:4,height:5}},
   {label:'Dense sample',values:{mass:780,length:5,width:4,height:2}},
   {label:'Low density',values:{mass:50,length:8,width:5,height:4}}
  ],
  challenge:{text:'Create a sample with density between 2600 and 2800 kg m⁻³.',check:(v)=>{const rho=(v.mass/1000)/(v.length*v.width*v.height*1e-6);return rho>=2600&&rho<=2800}}
 },
 elasticity:{
  knowledge:['Tensile stress = F/A.','Tensile strain = ΔL/L.','Young modulus E=stress/strain in the linear elastic region.','Equivalent wire form: E=FL/(AΔL).'],
  presets:[
   {label:'Steel-like',values:{force:50,length:1.5,area:.4,young:200}},
   {label:'Long wire',values:{force:50,length:3,area:.4,young:200}},
   {label:'Thin wire',values:{force:50,length:1.5,area:.15,young:200}}
  ],
  challenge:{text:'Adjust the setup so extension is between 0.8 mm and 1.2 mm.',check:(v)=>{const ext=v.force*v.length/(v.area*1e-6*v.young*1e9);return ext>=.0008&&ext<=.0012}}
 },
 stressstrain:{
  knowledge:['The initial straight-line gradient is Young modulus.','Elastic deformation is recoverable on unloading.','Plastic deformation leaves permanent strain.','Breaking stress/strain, stiffness and ductility describe different material properties.'],
  presets:[
   {label:'Stiff material',values:{strain:.01,young:200,yield:300,break:.06}},
   {label:'More ductile',values:{strain:.04,young:120,yield:220,break:.095}},
   {label:'Near fracture',values:{strain:.065,young:120,yield:240,break:.07}}
  ],
  challenge:{text:'Place the material in the plastic region without fracturing it.',check:(v)=>{const epsY=(v.yield*1e6)/(v.young*1e9);return v.strain>epsY&&v.strain<v.break}}
 }
};

const simActivities = {
 vectors:[
  ['Predict','Before moving the angle slider, predict which component will increase as the angle rises from 20° to 70° while magnitude stays fixed.'],
  ['Measure','Record Fₓ and Fᵧ at 30°, 45° and 60°. Check that √(Fₓ²+Fᵧ²) returns the original vector magnitude each time.'],
  ['Apply','Choose values that give nearly equal horizontal and vertical components. Explain why the required angle is close to 45°.']
 ],
 equilibrium:[
  ['Predict','Move one force angle by 20°. Predict how the balancing third force must change before reading the result.'],
  ['Measure','Create three different closed force triangles and record the balancing force magnitude/direction for each.'],
  ['Apply','Explain why an object can be moving while the force triangle is still closed.']
 ],
 moments:[
  ['Predict','Double the perpendicular distance while keeping force fixed. Predict the new moment.'],
  ['Measure','Find three force–distance pairs that all produce the same moment.'],
  ['Apply','Explain why pushing at the end of a door is more effective than pushing near the hinge.']
 ],
 couplecom:[
  ['Predict','Double the separation of the couple forces. Predict the couple moment.'],
  ['Measure','Move the centre of mass to either side of the pivot and compare the sign/direction of its weight moment.'],
  ['Apply','Describe the difference between the translational effect of a single force and the rotational effect of a pure couple.']
 ],
 motion:[
  ['Predict','Set negative acceleration with positive initial velocity. Predict when the object will stop and reverse.'],
  ['Measure','Use the v–t graph to estimate displacement from area and compare with the live s readout.'],
  ['Apply','Create a run where final velocity is negative and explain the signs of velocity, acceleration and displacement.']
 ],
 bounce:[
  ['Predict','Reduce retained speed from 90% to 50%. Predict how quickly successive bounce heights decrease.'],
  ['Measure','Compare two successive peak heights and relate their ratio to the retained-speed setting.'],
  ['Apply','Use the graph to explain why the collision produces a large acceleration even though the collision time is short.']
 ],
 projectile:[
  ['Predict','At fixed speed compare 30°, 45° and 60° with zero drag. Predict range and maximum height trends.'],
  ['Measure','Add drag and compare flight time, range and the horizontal velocity component with the no-drag case.'],
  ['Apply','Explain why the descending branch is not a mirror image of the ascending branch when drag is present.']
 ],
 terminal:[
  ['Predict','Increase mass but keep drag coefficient fixed. Predict terminal speed.'],
  ['Measure','Record weight, drag and resultant force early in the fall and close to terminal speed.'],
  ['Apply','Explain why acceleration decreases even though weight remains constant.']
 ],
 vehicle:[
  ['Predict','Increase aerodynamic drag coefficient and predict the maximum steady speed.'],
  ['Measure','Find the speed where resistance and driving force are approximately equal.'],
  ['Apply','Explain why a more powerful driving force does not produce constant acceleration at high speed.']
 ],
 newton:[
  ['Predict','Double mass with the same resultant force. Predict acceleration.'],
  ['Measure','Hold mass fixed and collect three resultant-force/acceleration pairs. Check proportionality.'],
  ['Apply','Construct a free-body diagram matching one simulator setup and show how ΣF gives the displayed acceleration.']
 ],
 momentum:[
  ['Predict','Give the second trolley a negative velocity and predict the direction of the joined pair after collision.'],
  ['Measure','Compare total momentum before/after for three setups and then compare kinetic energy.'],
  ['Apply','Explain why kinetic energy can fall while momentum remains conserved.']
 ],
 impulse:[
  ['Predict','Double contact time while halving peak force. Predict whether impulse changes.'],
  ['Measure','Create three triangular pulses with nearly the same area and compare peak forces.'],
  ['Apply','Link the model to a safety feature that increases collision time and explain the force reduction.']
 ],
 collisiontypes:[
  ['Predict','Switch between sticking and ideal elastic modes. Predict which mode retains kinetic energy.'],
  ['Measure','Record total momentum and total kinetic energy before/after in all three modes.'],
  ['Apply','Explain how kinetic energy can increase in explosion mode without violating conservation of energy.']
 ],
 energy:[
  ['Predict','Increase the dissipated-energy percentage and predict final speed.'],
  ['Measure','For three loss settings, record GPE, KE and dissipated energy and check the total accounting.'],
  ['Apply','Write a conservation-of-energy equation for one run including the dissipated transfer.']
 ],
 workgraph:[
  ['Predict','Set starting and final forces equal. Predict the graph shape and work formula.'],
  ['Measure','Compare work for the same displacement with increasing, constant and decreasing force.'],
  ['Apply','Explain why using final force × distance is wrong for a changing force.']
 ],
 motor:[
  ['Predict','Lift the same mass and height in half the time. Predict useful output power.'],
  ['Measure','Change input power while useful output stays the same and record the efficiency change.'],
  ['Apply','Write a method for a motor-efficiency investigation and identify one random and one systematic uncertainty.']
 ],
 springenergy:[
  ['Predict','Double extension within the Hookean region. Predict force and stored energy.'],
  ['Measure','Collect force/extension pairs below the proportional limit and check that F/ΔL is constant.'],
  ['Apply','Move beyond the proportional limit and explain why the linear energy formula is no longer the complete graph-area calculation.']
 ],
 density:[
  ['Predict','Double one dimension at constant mass. Predict the effect on density.'],
  ['Measure','Change dimensions to double volume and verify how density changes when mass is unchanged.'],
  ['Apply','Explain why density is a material/sample property ratio rather than simply “how heavy something is”.']
 ],
 elasticity:[
  ['Predict','Double wire length at fixed force, area and Young modulus. Predict extension.'],
  ['Measure','Compare extension for two areas and two original lengths while keeping material and force fixed.'],
  ['Apply','Use E=FL/(AΔL) to explain every trend you observe.']
 ],
 stressstrain:[
  ['Predict','Increase Young modulus while keeping yield stress similar. Predict the initial graph gradient.'],
  ['Measure','Compare the strain at yield and breaking strain for two settings.'],
  ['Apply','Identify stiffness, strength and ductility separately from the graph and explain why they are different properties.']
 ]
};
const simActivityProgress=JSON.parse(localStorage.getItem('mechanicsSimActivities')||'{}');
function simActivitiesHtml(id){
 const list=simActivities[id]||[];
 return '<div class="sim-activities"><div class="sim-activity-title"><strong>Guided activities</strong><span>'+list.length+' tasks</span></div>'+list.map((a,i)=>{
  const key=id+'::'+i,done=!!simActivityProgress[key];
  return '<label class="sim-activity '+(done?'done':'')+'"><input type="checkbox" data-sim-activity="'+key+'" '+(done?'checked':'')+'><span><b>'+(i+1)+'. '+a[0]+'</b>'+a[1]+'</span></label>';
 }).join('')+'</div>';
}
function bindSimActivities(){
 $$('[data-sim-activity]').forEach(box=>box.addEventListener('change',()=>{
  simActivityProgress[box.dataset.simActivity]=box.checked;
  localStorage.setItem('mechanicsSimActivities',JSON.stringify(simActivityProgress));
  box.closest('.sim-activity')?.classList.toggle('done',box.checked);
 }));
}

let activeSim=0, simValues={}, running=true, slow=false, simTime=0, last=performance.now();
const canvas=$('#simCanvas'), ctx=canvas.getContext('2d');
let simRenderError=null;
function syncSimCanvas(){
 const rect=canvas.getBoundingClientRect();
 const cssW=Math.max(320,Math.round(rect.width||canvas.parentElement?.clientWidth||900));
 const cssH=Math.max(360,Math.round(rect.height||430));
 const dpr=Math.min(2,window.devicePixelRatio||1);
 const pixelW=Math.max(320,Math.round(cssW*dpr)),pixelH=Math.max(360,Math.round(cssH*dpr));
 if(canvas.width!==pixelW||canvas.height!==pixelH){
  canvas.width=pixelW;canvas.height=pixelH;
 }
 ctx.setTransform(dpr,0,0,dpr,0,0);
 return {w:cssW,h:cssH,dpr};
}
function showSimError(error){
 simRenderError=error;
 const state=$('#simState');if(state){state.textContent='Simulation error';state.classList.add('error');}
 const readout=$('#simReadout');if(readout)readout.textContent='The simulation could not draw. Reset the model or reload the latest build.';
 console.error('Simulation render error:',error);
}
function drawSimSafely(){
 try{syncSimCanvas();drawSim();simRenderError=null;}catch(error){showSimError(error);}
}
const simResizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>{if($('#view-lab')?.classList.contains('active-view'))drawSimSafely();}):null;
if(simResizeObserver)simResizeObserver.observe(canvas);

function setSimById(id){
 const i=sims.findIndex(s=>s.id===id); if(i>=0){activeSim=i;renderSim();}
}
function renderSimTabs(){
 $('#simTabs').innerHTML=sims.map((s,i)=>'<button class="sim-tab '+(i===activeSim?'active':'')+'" data-sim="'+i+'">'+s.title+'</button>').join('');
 $$('.sim-tab').forEach(b=>b.addEventListener('click',()=>{activeSim=Number(b.dataset.sim);renderSim();}));
}
const simDataRecords={};
const simChallengeProgress=JSON.parse(localStorage.getItem('mechanicsSimChallenges')||'{}');
const simDisplay={grid:true,vectors:true,live:true};

function getSimMetrics(id,v,t=simTime){
 const m=[];
 const add=(label,value)=>m.push([label,value]);
 if(id==='vectors'){const r=v.angle*Math.PI/180;add('Horizontal component',fmt(v.mag*Math.cos(r))+' N');add('Vertical component',fmt(v.mag*Math.sin(r))+' N');add('Vector magnitude',fmt(v.mag)+' N');add('Direction',fmt(v.angle)+'°');}
 if(id==='equilibrium'){const a=v.a1*Math.PI/180,b=v.a2*Math.PI/180,x=v.f1*Math.cos(a)+v.f2*Math.cos(b),y=v.f1*Math.sin(a)+v.f2*Math.sin(b);add('Resultant of F₁+F₂',fmt(Math.hypot(x,y))+' N');add('Balancing force',fmt(Math.hypot(x,y))+' N');add('Balance direction',fmt((Math.atan2(-y,-x)*180/Math.PI+360)%360)+'°');add('ΣF with F₃','0 N');}
 if(id==='moments'){add('Moment',fmt(v.force*v.distance)+' N m');add('Force',fmt(v.force)+' N');add('Perpendicular distance',fmt(v.distance)+' m');}
 if(id==='couplecom'){add('Couple moment',fmt(v.force*v.sep)+' N m');add('Resultant force of couple','0 N');add('Weight moment',fmt(20*9.81*v.com)+' N m');add('COM offset',fmt(v.com)+' m');}
 if(id==='motion'){const tt=t%8,vel=v.u+v.a*tt,pos=v.u*tt+.5*v.a*tt*tt;add('Time',fmt(tt)+' s');add('Velocity',fmt(vel)+' m s⁻¹');add('Displacement',fmt(pos)+' m');add('Graph gradient',fmt(v.a)+' m s⁻²');}
 if(id==='bounce'){const e=v.retain/100,n=Math.floor(t/1.5)%5,h=v.drop*Math.pow(e*e,n);add('Bounce number',String(n+1));add('Approx. peak height',fmt(h)+' m');add('Speed retained',fmt(v.retain)+'%');add('Free-flight acceleration','−9.81 m s⁻²');}
 if(id==='projectile'){const r=v.angle*Math.PI/180,T=projectileFlight(v),ux=v.speed*Math.cos(r),uy=v.speed*Math.sin(r),p=projectileState(Math.min(t%Math.max(.2,T),T),v);add('Initial vₓ',fmt(ux)+' m s⁻¹');add('Initial vᵧ',fmt(uy)+' m s⁻¹');add('Flight time',fmt(T)+' s');add('Current speed',fmt(Math.hypot(p.vx,p.vy))+' m s⁻¹');}
 if(id==='terminal'){const vt=v.mass*9.81/v.k,tt=t%8,s=vt*(1-Math.exp(-v.k*tt/v.mass)),drag=v.k*s;add('Terminal speed',fmt(vt)+' m s⁻¹');add('Current speed',fmt(s)+' m s⁻¹');add('Weight',fmt(v.mass*9.81)+' N');add('Drag',fmt(drag)+' N');}
 if(id==='vehicle'){const vmax=Math.sqrt(Math.max(0,(v.drive-v.roll)/v.drag)),tt=t%12,s=vmax*(1-Math.exp(-tt/3)),res=v.roll+v.drag*s*s;add('Max steady speed',fmt(vmax)+' m s⁻¹');add('Current speed',fmt(s)+' m s⁻¹');add('Total resistance',fmt(res)+' N');add('Resultant force',fmt(v.drive-res)+' N');}
 if(id==='newton'){const F=v.drive-v.resist;add('Resultant force',fmt(F)+' N');add('Acceleration',fmt(F/v.mass)+' m s⁻²');add('Mass',fmt(v.mass)+' kg');add('Force balance',F===0?'Balanced':'Unbalanced');}
 if(id==='momentum'){const p=v.m1*v.v1+v.m2*v.v2,V=p/(v.m1+v.m2),ki=.5*v.m1*v.v1*v.v1+.5*v.m2*v.v2*v.v2,kf=.5*(v.m1+v.m2)*V*V;add('Total momentum',fmt(p)+' kg m s⁻¹');add('Joined velocity',fmt(V)+' m s⁻¹');add('KE before',fmt(ki)+' J');add('KE after',fmt(kf)+' J');}
 if(id==='impulse'){const J=.5*v.peak*v.time;add('Impulse',fmt(J)+' N s');add('Δp',fmt(J)+' kg m s⁻¹');add('Δv magnitude',fmt(J/v.mass)+' m s⁻¹');add('Average force',fmt(J/v.time)+' N');}
 if(id==='energy'){const G=v.mass*9.81*v.height,K=G*(1-v.loss/100);add('Initial GPE',fmt(G)+' J');add('Final KE available',fmt(K)+' J');add('Dissipated',fmt(G-K)+' J');add('Final speed',fmt(Math.sqrt(Math.max(0,2*K/v.mass)))+' m s⁻¹');}
 if(id==='workgraph'){const W=.5*(v.f0+v.f1)*v.distance;add('Work / graph area',fmt(W)+' J');add('Mean force',fmt((v.f0+v.f1)/2)+' N');add('Displacement',fmt(v.distance)+' m');}
 if(id==='motor'){const E=v.mass*9.81*v.height,P=E/v.time,eff=100*P/v.input;add('Useful GPE',fmt(E)+' J');add('Useful output power',fmt(P)+' W');add('Input power',fmt(v.input)+' W');add('Efficiency',fmt(eff)+'%');}
 if(id==='springenergy'){const linear=v.ext<=v.limit,F=linear?v.k*v.ext:v.k*v.limit+v.k*.35*(v.ext-v.limit),E=linear?.5*v.k*v.ext*v.ext:.5*v.k*v.limit*v.limit+(v.ext-v.limit)*(v.k*v.limit+F)/2;add('Force',fmt(F)+' N');add('Elastic energy',fmt(E)+' J');add('F/extension',v.ext?fmt(F/v.ext)+' N m⁻¹':'—');add('Region',linear?'Hookean':'Non-linear');}
 if(id==='collisiontypes'){const mode=Math.round(v.mode);let p0=0,p1=0,k0=0,k1=0;if(mode===0){const V=v.m1*v.speed/(v.m1+v.m2);p0=v.m1*v.speed;p1=(v.m1+v.m2)*V;k0=.5*v.m1*v.speed*v.speed;k1=.5*(v.m1+v.m2)*V*V;}else if(mode===1){const a=(v.m1-v.m2)/(v.m1+v.m2)*v.speed,b=2*v.m1/(v.m1+v.m2)*v.speed;p0=v.m1*v.speed;p1=v.m1*a+v.m2*b;k0=.5*v.m1*v.speed*v.speed;k1=.5*v.m1*a*a+.5*v.m2*b*b;}else{const a=v.speed,b=-v.m1*a/v.m2;p1=v.m1*a+v.m2*b;k1=.5*v.m1*a*a+.5*v.m2*b*b;}add('Mode',['Sticking','Elastic','Explosion'][mode]);add('Momentum before',fmt(p0)+' kg m s⁻¹');add('Momentum after',fmt(p1)+' kg m s⁻¹');add('KE change',fmt(k1-k0)+' J');}
 if(id==='density'){const V=v.length*v.width*v.height,rho=(v.mass/1000)/(V*1e-6);add('Volume',fmt(V)+' cm³');add('Mass',fmt(v.mass)+' g');add('Density',fmt(rho)+' kg m⁻³');}
 if(id==='elasticity'){const A=v.area*1e-6,E=v.young*1e9,stress=v.force/A,strain=stress/E,ext=strain*v.length;add('Stress',fmt(stress)+' Pa');add('Strain',fmt(strain));add('Extension',fmt(ext*1000)+' mm');add('Young modulus',fmt(E)+' Pa');}
 if(id==='stressstrain'){const E=v.young*1e9,y=v.yield*1e6,epsY=y/E,region=v.strain>=v.break?'Fractured':v.strain>epsY?'Plastic':'Elastic';add('Yield strain',fmt(epsY));add('Applied strain',fmt(v.strain));add('Young modulus',fmt(E)+' Pa');add('Region',region);}
 return m;
}

function simVariablesText(){
 const s=sims[activeSim];
 return s.controls.map(control=>control.label.split(' / ')[0]+'='+fmt(simValues[control.key])).join('; ');
}
function simResultsText(){return getSimMetrics(sims[activeSim].id,simValues).map(x=>x[0]+'='+x[1]).join('; ');}

function renderSimData(){
 const id=sims[activeSim].id,rows=simDataRecords[id]||[];
 $('#simDataRows').innerHTML=rows.length?rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+r.variables+'</td><td>'+r.results+'</td></tr>').join(''):'<tr><td colspan="3" class="muted">No trials recorded yet. Change a variable, make a prediction, then record the result.</td></tr>';
}
function updateSimEnhancements(){
 const id=sims[activeSim].id,profile=simEnhancements[id]||{},metrics=getSimMetrics(id,simValues);
 $('#simMetrics').innerHTML=simDisplay.live?metrics.map(x=>'<div class="sim-metric"><span>'+x[0]+'</span><strong>'+x[1]+'</strong></div>').join(''):'';
 const done=!!profile.challenge?.check?.(simValues,simTime);
 if(done)simChallengeProgress[id]=true;
 localStorage.setItem('mechanicsSimChallenges',JSON.stringify(simChallengeProgress));
 $('#simChallengeState').textContent=done?'Completed':(simChallengeProgress[id]?'Previously completed':'In progress');
 $('#simChallengeState').classList.toggle('success',done);
}
function renderSimEnhancements(){
 const id=sims[activeSim].id,profile=simEnhancements[id]||{};
 $('#keyKnowledge').innerHTML='<ul class="key-knowledge-list">'+(profile.knowledge||[]).map(x=>'<li>'+x+'</li>').join('')+'</ul>';
 $('#simPresets').innerHTML=(profile.presets||[]).map((p,i)=>'<button class="button sim-preset" data-sim-preset="'+i+'">'+p.label+'</button>').join('');
 $('#simChallenge').textContent=profile.challenge?.text||'Explore how changing one variable affects the model.';
 $('#simCanvasHint').textContent=simCanvasHints[id]||'Use the sliders, presets and data recorder to investigate one variable at a time.';
 $$('[data-sim-preset]').forEach(b=>b.addEventListener('click',()=>{
  const preset=profile.presets[Number(b.dataset.simPreset)];if(!preset)return;
  Object.entries(preset.values).forEach(([key,value])=>{
   simValues[key]=value;
   const input=$('[data-control="'+key+'"]');if(input){input.value=value;const out=$('[data-output="'+key+'"]');if(out)out.textContent=value;}
  });
  simTime=0;updateReadout();drawSimSafely();
 }));
 renderSimData();updateSimEnhancements();
}

const simCanvasHints={
 vectors:'Drag the blue vector tip to change magnitude and direction.',
 equilibrium:'Drag the first or second force endpoint to reshape the closed force triangle.',
 moments:'Drag the force arrow along the beam; move up/down while dragging to change force size.',
 couplecom:'Drag the yellow centre-of-mass marker, or drag a couple force to alter separation and force.',
 motion:'Drag the start or end of the velocity–time line to change initial velocity or acceleration. Drag the car/graph horizontally to scrub time.',
 bounce:'Drag the ball up/down to set drop height. Drag on the graph to change rebound percentage or scrub through the bounce.',
 projectile:'Drag from the launch point to set launch speed and angle directly.',
 terminal:'Drag the falling object vertically to scrub time; drag the terminal-speed line on the graph to change drag coefficient.',
 vehicle:'Drag the driving-force line vertically, or drag the graph intersection horizontally to target a different maximum speed.',
 newton:'Drag the green driving-force arrow or red resistance arrow horizontally to change the forces.',
 momentum:'Drag either trolley left/right to set its signed initial velocity. Drag the lower timeline area to scrub through the collision.',
 impulse:'Drag the triangle peak to change peak force and contact time together.',
 energy:'Drag the yellow object along the track to scrub through the energy transfer.',
 workgraph:'Drag the right graph point to change final force and displacement.',
 motor:'Drag the lifted mass vertically to change lift height; drag horizontally to change lift time.',
 springenergy:'Drag the highlighted point on the force–extension graph to set extension; move vertically to adjust stiffness.',
 collisiontypes:'Drag horizontally to scrub the interaction. Drag vertically in the left, middle or right third to select sticking, elastic or explosion.',
 density:'Drag the front-right corner to change length/height; drag the top depth corner to change width.',
 elasticity:'Drag the hanging mass vertically to change tension; drag the graph point horizontally to change original length.',
 stressstrain:'Drag the highlighted point across the stress–strain graph to move through elastic, plastic and fracture regions.'
};

function setSimControl(key,value,{resetTime=true}={}){
 const s=sims[activeSim],control=s.controls.find(x=>x.key===key);
 if(!control)return;
 const v=clamp(Number(value),Number(control.min),Number(control.max));
 const step=Number(control.step)||0;
 const snapped=step?Math.round(v/step)*step:v;
 simValues[key]=Number(snapped.toFixed(8));
 const input=$('[data-control="'+key+'"]'),out=$('[data-output="'+key+'"]');
 if(input)input.value=simValues[key];
 if(out)out.textContent=simValues[key];
 if(resetTime)simTime=0;
}
let simPointerActive=false,simDragTarget=null;

function simPoint(event){
 const rect=canvas.getBoundingClientRect();
 return {rect,w:rect.width,h:rect.height,x:clamp(event.clientX-rect.left,0,rect.width),y:clamp(event.clientY-rect.top,0,rect.height)};
}
function dist2(x1,y1,x2,y2){const dx=x1-x2,dy=y1-y2;return dx*dx+dy*dy;}
function chooseSimDragTarget(id,x,y,w,h){
 if(id==='vectors')return 'vector';
 if(id==='equilibrium'){
  const cx=w*.38,cy=h*.58,scale=Math.min(w,h)*.0045,r1=simValues.a1*Math.PI/180,r2=simValues.a2*Math.PI/180;
  const x1=cx+simValues.f1*Math.cos(r1)*scale,y1=cy-simValues.f1*Math.sin(r1)*scale;
  const x2=x1+simValues.f2*Math.cos(r2)*scale,y2=y1-simValues.f2*Math.sin(r2)*scale;
  return dist2(x,y,x1,y1)<=dist2(x,y,x2,y2)?'f1':'f2';
 }
 if(id==='moments')return 'force';
 if(id==='couplecom'){
  const cx=w*.48,cy=h*.48,beam=Math.min(w*.62,520),comX=cx+simValues.com*beam*.45;
  return dist2(x,y,comX,cy-12)<2600?'com':'couple';
 }
 if(id==='motion'){
  const gx=65,gy=h*.55,gw=w-120,gh=h*.34,leftY=gy+gh*.5-simValues.u*gh/60;
  return dist2(x,y,gx,leftY)<2500?'u':(y>h*.48?'a':'time');
 }
 if(id==='bounce')return x<w*.48?'drop':(y<h*.5?'retain':'time');
 if(id==='projectile')return 'launch';
 if(id==='terminal')return x<w*.48?'time':'terminal';
 if(id==='vehicle')return y<h*.35?'drive':'vmax';
 if(id==='newton'){
  const cx=w*.5;
  return x>=cx?'drive':'resist';
 }
 if(id==='momentum')return y>h*.68?'time':(x<w*.5?'v1':'v2');
 if(id==='impulse')return 'pulse';
 if(id==='energy')return 'time';
 if(id==='workgraph')return 'endpoint';
 if(id==='motor')return 'lift';
 if(id==='springenergy')return 'spring';
 if(id==='collisiontypes')return 'collision';
 if(id==='density'){
  const bx=w*.25,by=h*.32,sx=Math.min(180,60+simValues.length*8),sy=Math.min(120,35+simValues.height*7),d=Math.min(70,20+simValues.width*5);
  return dist2(x,y,bx+sx+d,by-d)<dist2(x,y,bx+sx,by+sy)?'width':'size';
 }
 if(id==='elasticity')return x<w*.48?'force':'length';
 if(id==='stressstrain')return 'strain';
 return null;
}

function handleSimPointer(event){
 if(!simPointerActive&&event.type!=='pointerdown')return;
 const p=simPoint(event),{w,h,x,y}=p,id=sims[activeSim].id,target=simDragTarget||chooseSimDragTarget(id,x,y,w,h);
 let changed=false;
 if(id==='vectors'){
  const ox=w*.22,oy=h*.72,dx=Math.max(0,x-ox),dy=Math.max(0,oy-y),scale=Math.min(w,h)*.006;
  setSimControl('mag',Math.hypot(dx,dy)/Math.max(scale,.001),{resetTime:false});
  setSimControl('angle',Math.atan2(dy,Math.max(dx,.001))*180/Math.PI,{resetTime:false});changed=true;
 }
 if(id==='equilibrium'){
  const cx=w*.38,cy=h*.58,scale=Math.min(w,h)*.0045,r1=simValues.a1*Math.PI/180;
  if(target==='f1'){
   const dx=x-cx,dy=cy-y;
   setSimControl('f1',Math.hypot(dx,dy)/Math.max(scale,.001),{resetTime:false});
   setSimControl('a1',(Math.atan2(dy,dx)*180/Math.PI+360)%360,{resetTime:false});
  }else{
   const x1=cx+simValues.f1*Math.cos(r1)*scale,y1=cy-simValues.f1*Math.sin(r1)*scale,dx=x-x1,dy=y1-y;
   setSimControl('f2',Math.hypot(dx,dy)/Math.max(scale,.001),{resetTime:false});
   setSimControl('a2',(Math.atan2(dy,dx)*180/Math.PI+360)%360,{resetTime:false});
  }
  changed=true;
 }
 if(id==='moments'){
  const cx=w*.46,len=Math.min(w*.72,620);
  setSimControl('distance',Math.abs(x-cx)/(len*.42)*1.2,{resetTime:false});
  setSimControl('force',120*(1-clamp(y/(h*.55),0,1)),{resetTime:false});changed=true;
 }
 if(id==='couplecom'){
  const cx=w*.48,beam=Math.min(w*.62,520);
  if(target==='com')setSimControl('com',(x-cx)/(beam*.45),{resetTime:false});
  else{
   setSimControl('sep',Math.abs(x-cx)/(beam*.275),{resetTime:false});
   setSimControl('force',5+75*(1-clamp(y/h,0,1)),{resetTime:false});
  }changed=true;
 }
 if(id==='motion'){
  const gx=65,gy=h*.55,gw=w-120,gh=h*.34;
  if(target==='time'){simTime=8*clamp((x-30)/(w-60),0,1);running=false;$('#playPause').textContent='Play';}
  else if(target==='u')setSimControl('u',30*(gy+gh*.5-y)/Math.max(gh,1),{resetTime:false});
  else{
   const tt=Math.max(.5,8*clamp((x-gx)/Math.max(gw,1),.08,1)),vAt=30*(gy+gh*.5-y)/Math.max(gh,1);
   setSimControl('a',(vAt-simValues.u)/tt,{resetTime:false});
  }changed=true;
 }
 if(id==='bounce'){
  if(target==='drop')setSimControl('drop',.5+4.5*(1-clamp((y-40)/(h*.45),0,1)),{resetTime:false});
  else if(target==='retain')setSimControl('retain',30+65*(1-clamp((y-55)/(h-110),0,1)),{resetTime:false});
  else{simTime=6*clamp(x/w,0,1);running=false;$('#playPause').textContent='Play';}
  changed=true;
 }
 if(id==='projectile'){
  const ox=45,oy=h-45,dx=Math.max(1,x-ox),dy=Math.max(0,oy-y),angle=Math.atan2(dy,dx)*180/Math.PI;
  const frac=clamp(Math.hypot(dx,dy)/(Math.min(w,h)*.42),0,1);
  setSimControl('angle',angle,{resetTime:false});setSimControl('speed',5+30*frac,{resetTime:false});changed=true;
 }
 if(id==='terminal'){
  if(target==='time'){simTime=8*clamp((y-70)/Math.max(h-150,1),0,1);running=false;$('#playPause').textContent='Play';}
  else{
   const gy=55,gh=h-110,frac=1-clamp((y-gy)/Math.max(gh,1),0,1),vt=Math.max(.2,frac*(simValues.mass*9.81/.5)*1.1);
   setSimControl('k',simValues.mass*9.81/vt,{resetTime:false});
  }changed=true;
 }
 if(id==='vehicle'){
  if(target==='drive')setSimControl('drive',500+7500*(1-clamp(y/(h*.5),0,1)),{resetTime:false});
  else{
   const gx=w*.55,gw=w*.37,targetV=Math.max(1,60*clamp((x-gx)/Math.max(gw,1),.02,1));
   setSimControl('drag',Math.max(.5,(simValues.drive-simValues.roll)/(targetV*targetV)),{resetTime:false});
  }changed=true;
 }
 if(id==='newton'){
  const cx=w*.5,span=w*.34,force=5000*clamp(Math.abs(x-cx)/Math.max(span,1),0,1);
  setSimControl(target==='drive'?'drive':'resist',target==='drive'?force:Math.min(2500,force),{resetTime:false});changed=true;
 }
 if(id==='momentum'){
  if(target==='time'){simTime=6*clamp(x/w,0,1);running=false;$('#playPause').textContent='Play';}
  else{
   const center=target==='v1'?w*.25:w*.75,vel=8*clamp((x-center)/(w*.22),-1,1);
   setSimControl(target,vel,{resetTime:false});
  }changed=true;
 }
 if(id==='impulse'){
  const gx=70,gy=55,gw=w-130,gh=h-110;
  setSimControl('time',.01+.29*clamp((x-gx)/Math.max(gw,1),0,1),{resetTime:false});
  setSimControl('peak',100+4900*(1-clamp((y-gy)/Math.max(gh,1),0,1)),{resetTime:false});changed=true;
 }
 if(id==='energy'){
  simTime=6*clamp((x-50)/Math.max(w*.63-50,1),0,1);running=false;$('#playPause').textContent='Play';changed=true;
 }
 if(id==='workgraph'){
  const gx=70,gy=55,gw=w-130,gh=h-110;
  setSimControl('distance',.5+7.5*clamp((x-gx)/Math.max(gw,1),0,1),{resetTime:false});
  setSimControl('f1',120*(1-clamp((y-gy)/Math.max(gh,1),0,1)),{resetTime:false});changed=true;
 }
 if(id==='motor'){
  const top=60,ground=h-65,frac=1-clamp((y-top)/Math.max(ground-top,1),0,1);
  setSimControl('height',.5+4.5*frac,{resetTime:false});
  setSimControl('time',1+11*clamp(x/w,0,1),{resetTime:false});changed=true;
 }
 if(id==='springenergy'){
  const gx=70,gw=w*.56,gy=55,gh=h-110;
  setSimControl('ext',.30*clamp((x-gx)/Math.max(gw,1),0,1),{resetTime:false});
  if(y>=gy&&y<=gy+gh)setSimControl('k',20+480*(1-clamp((y-gy)/Math.max(gh,1),0,1)),{resetTime:false});changed=true;
 }
 if(id==='collisiontypes'){
  simTime=6*clamp(x/w,0,1);running=false;$('#playPause').textContent='Play';
  const mode=y<h/3?0:y<2*h/3?1:2;setSimControl('mode',mode,{resetTime:false});changed=true;
 }
 if(id==='density'){
  const bx=w*.25,by=h*.32;
  if(target==='width')setSimControl('width',1+9*clamp((x-bx)/(w*.35),0,1),{resetTime:false});
  else{
   setSimControl('length',1+11*clamp((x-bx)/(w*.35),0,1),{resetTime:false});
   setSimControl('height',1+9*clamp((y-by)/(h*.35),0,1),{resetTime:false});
  }changed=true;
 }
 if(id==='elasticity'){
  if(target==='force')setSimControl('force',120*(1-clamp((y-65)/(h*.65),0,1)),{resetTime:false});
  else setSimControl('length',.5+2.5*clamp((x-w*.52)/(w*.40),0,1),{resetTime:false});changed=true;
 }
 if(id==='stressstrain'){
  const gx=70,gw=w-130,br=simValues.break;
  setSimControl('strain',br*1.08*clamp((x-gx)/Math.max(gw,1),0,1),{resetTime:false});changed=true;
 }
 if(changed){
  updateReadout();drawSimSafely();
  $('#simState').textContent=running?(slow?'Slow motion':'Running'):'Direct control';
  event.preventDefault();
 }
}
canvas.addEventListener('pointerdown',e=>{const p=simPoint(e);simPointerActive=true;simDragTarget=chooseSimDragTarget(sims[activeSim].id,p.x,p.y,p.w,p.h);canvas.setPointerCapture?.(e.pointerId);handleSimPointer(e);});
canvas.addEventListener('pointermove',handleSimPointer);
canvas.addEventListener('pointerup',e=>{simPointerActive=false;simDragTarget=null;canvas.releasePointerCapture?.(e.pointerId);});
canvas.addEventListener('pointercancel',()=>{simPointerActive=false;simDragTarget=null;});

function renderSim(){
 const s=sims[activeSim]; simValues={}; s.controls.forEach(c=>simValues[c.key]=c.value); simTime=0;
 renderSimTabs();
 $('#simCode').textContent=s.code; $('#simSpec').textContent='AQA '+s.code; $('#simTitle').textContent=s.title; $('#simSubtitle').textContent=s.subtitle;
 $('#simpleExplain').textContent=s.simple; $('#examExplain').textContent=s.exam; $('#mistakeExplain').textContent=s.mistake;
 const teaching=simTeaching[s.id]||{watch:'Change one variable at a time and connect the visual change to the governing physics.',assume:'This is a schematic teaching model; sizes and times may be rescaled.'};
 if($('#watchExplain'))$('#watchExplain').textContent=teaching.watch;
 if($('#assumptionExplain'))$('#assumptionExplain').textContent=teaching.assume;
 $('#simCheck').innerHTML='<p>'+s.check[0]+'</p><button class="text-button" id="revealSimCheck">Show answer</button><div class="answer-reveal">'+s.check[1]+'</div><div class="sim-investigate"><strong>Try this investigation:</strong> '+s.investigate+'</div>'+simActivitiesHtml(s.id);
 $('#revealSimCheck').addEventListener('click',e=>{const a=e.target.nextElementSibling;a.classList.toggle('visible');e.target.textContent=a.classList.contains('visible')?'Hide answer':'Show answer';});
 bindSimActivities();
 $('#simControls').innerHTML=s.controls.map(c=>'<label class="field"><span>'+c.label+'</span><input type="range" data-control="'+c.key+'" min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+c.value+'"><output data-output="'+c.key+'">'+c.value+'</output></label>').join('');
 $$('[data-control]').forEach(inp=>inp.addEventListener('input',()=>{simValues[inp.dataset.control]=Number(inp.value);$('[data-output="'+inp.dataset.control+'"]').textContent=inp.value;simTime=0;updateReadout();drawSimSafely();}));
 renderSimEnhancements();
 updateReadout();
}

function updateReadout(){
 const s=sims[activeSim].id, v=simValues; let txt='';
 if(s==='vectors'){const x=v.mag*Math.cos(v.angle*Math.PI/180),y=v.mag*Math.sin(v.angle*Math.PI/180);txt='Fₓ = '+fmt(x)+' N   |   Fᵧ = '+fmt(y)+' N';}
 if(s==='equilibrium'){const r1=v.a1*Math.PI/180,r2=v.a2*Math.PI/180,x=v.f1*Math.cos(r1)+v.f2*Math.cos(r2),y=v.f1*Math.sin(r1)+v.f2*Math.sin(r2),f3=Math.hypot(x,y),ang=(Math.atan2(-y,-x)*180/Math.PI+360)%360;txt='Balancing force = '+fmt(f3)+' N at '+fmt(ang)+'° from +x';}
 if(s==='moments'){txt='Moment = '+fmt(v.force*v.distance)+' N m';}
 if(s==='couplecom'){const M=v.force*v.sep,weight=20*9.81,comM=weight*v.com;txt='couple moment = '+fmt(M)+' N m   |   COM weight moment = '+fmt(comM)+' N m';}
 if(s==='motion'){const t=simTime%8,vel=v.u+v.a*t,pos=v.u*t+.5*v.a*t*t;txt='t = '+fmt(t)+' s   |   v = '+fmt(vel)+' m s⁻¹   |   s = '+fmt(pos)+' m';}
 if(s==='bounce'){const e=v.retain/100,h0=v.drop,n=Math.floor(simTime/1.5)%5,hn=h0*Math.pow(e*e,n);txt='bounce '+(n+1)+'   |   approximate peak height = '+fmt(hn)+' m   |   retained speed = '+v.retain+'%';}
 if(s==='projectile'){const r=v.angle*Math.PI/180,ux=v.speed*Math.cos(r),uy=v.speed*Math.sin(r);txt='uₓ = '+fmt(ux)+' m s⁻¹   |   uᵧ = '+fmt(uy)+' m s⁻¹   |   drag constant = '+fmt(v.drag)+' s⁻¹';}
 if(s==='terminal'){const vt=v.mass*9.81/v.k,t=simTime%8,speed=vt*(1-Math.exp(-v.k*t/v.mass)),drag=v.k*speed,result=v.mass*9.81-drag;txt='vₜ ≈ '+fmt(vt)+' m s⁻¹   |   v = '+fmt(speed)+' m s⁻¹   |   drag = '+fmt(drag)+' N   |   ΣF = '+fmt(result)+' N';}
 if(s==='vehicle'){const vmax=Math.sqrt(Math.max(0,(v.drive-v.roll)/v.drag)),t=simTime%12,speed=vmax*(1-Math.exp(-t/3)),resist=v.roll+v.drag*speed*speed,result=v.drive-resist;txt='v = '+fmt(speed)+' m s⁻¹   |   resistance = '+fmt(resist)+' N   |   ΣF = '+fmt(result)+' N   |   max steady v ≈ '+fmt(vmax)+' m s⁻¹';}
 if(s==='newton'){const r=v.drive-v.resist,a=r/v.mass;txt='Resultant force = '+fmt(r)+' N   |   a = '+fmt(a)+' m s⁻²';}
 if(s==='momentum'){const p=v.m1*v.v1+v.m2*v.v2,fin=p/(v.m1+v.m2),kei=.5*v.m1*v.v1*v.v1+.5*v.m2*v.v2*v.v2,kef=.5*(v.m1+v.m2)*fin*fin;txt='Total p = '+fmt(p)+' kg m s⁻¹   |   final v = '+fmt(fin)+' m s⁻¹   |   KE change = '+fmt(kef-kei)+' J';}
 if(s==='impulse'){const J=.5*v.peak*v.time,dv=J/v.mass;txt='Impulse = area = '+fmt(J)+' N s   |   |Δp| = '+fmt(J)+' kg m s⁻¹   |   |Δv| = '+fmt(dv)+' m s⁻¹';}
 if(s==='energy'){const gpe=v.mass*9.81*v.height,ke=gpe*(1-v.loss/100),speed=Math.sqrt(Math.max(0,2*ke/v.mass));txt='Initial GPE = '+fmt(gpe)+' J   |   final KE available = '+fmt(ke)+' J   |   final v ≈ '+fmt(speed)+' m s⁻¹';}
 if(s==='workgraph'){const W=.5*(v.f0+v.f1)*v.distance;txt='Work = area = ½('+fmt(v.f0)+' + '+fmt(v.f1)+') × '+fmt(v.distance)+' = '+fmt(W)+' J';}
 if(s==='motor'){const usefulE=v.mass*9.81*v.height,usefulP=usefulE/v.time,eff=100*usefulP/v.input;txt='useful E = '+fmt(usefulE)+' J   |   useful P = '+fmt(usefulP)+' W   |   efficiency = '+fmt(eff)+'%';}
 if(s==='springenergy'){const linear=v.ext<=v.limit,F=linear?v.k*v.ext:v.k*v.limit+v.k*.35*(v.ext-v.limit),E=linear?.5*v.k*v.ext*v.ext:.5*v.k*v.limit*v.limit+(v.ext-v.limit)*(v.k*v.limit+F)/2;txt='force ≈ '+fmt(F)+' N   |   stored/transferred energy ≈ '+fmt(E)+' J   |   '+(linear?'Hookean region':'non-linear region');}
 if(s==='collisiontypes'){let p0=0,k0=0,p1=0,k1=0;if(v.mode===0){const u1=v.speed,u2=0,V=v.m1*u1/(v.m1+v.m2);p0=v.m1*u1;p1=(v.m1+v.m2)*V;k0=.5*v.m1*u1*u1;k1=.5*(v.m1+v.m2)*V*V;}else if(v.mode===1){const u1=v.speed,u2=0,a=(v.m1-v.m2)/(v.m1+v.m2)*u1,b=(2*v.m1)/(v.m1+v.m2)*u1;p0=v.m1*u1;p1=v.m1*a+v.m2*b;k0=.5*v.m1*u1*u1;k1=.5*v.m1*a*a+.5*v.m2*b*b;}else{const a=v.speed,b=-v.m1*a/v.m2;p0=0;p1=v.m1*a+v.m2*b;k0=0;k1=.5*v.m1*a*a+.5*v.m2*b*b;}txt='p before = '+fmt(p0)+'   p after = '+fmt(p1)+' kg m s⁻¹   |   KE before = '+fmt(k0)+' J   KE after = '+fmt(k1)+' J';}
 if(s==='density'){const Vcm=v.length*v.width*v.height,V=Vcm*1e-6,rho=(v.mass/1000)/V;txt='Volume = '+fmt(Vcm)+' cm³   |   density = '+fmt(rho)+' kg m⁻³';}
 if(s==='elasticity'){const A=v.area*1e-6,E=v.young*1e9,stress=v.force/A,strain=stress/E,ext=strain*v.length;txt='stress = '+stress.toExponential(2)+' Pa   |   strain = '+strain.toExponential(2)+'   |   ΔL = '+(ext*1000).toFixed(3)+' mm';}
 if(s==='stressstrain'){const E=v.young*1e9,y=v.yield*1e6,epsY=y/E,broken=v.strain>=v.break,stress=broken?0:(v.strain<=epsY?E*v.strain:y+(v.yield*.22e6)*Math.log1p((v.strain-epsY)*120));const region=broken?'fractured':(v.strain<=epsY?'linear elastic':'plastic');txt='region: '+region+'   |   stress ≈ '+(stress/1e6).toFixed(1)+' MPa   |   elastic strain limit ≈ '+epsY.toExponential(2);}
 $('#simReadout').textContent=txt;
 updateSimEnhancements();
}

function sizeCanvas(){
 const r=canvas.getBoundingClientRect(), dpr=Math.min(2,window.devicePixelRatio||1);
 canvas.width=Math.max(1,Math.floor(r.width*dpr));canvas.height=Math.max(1,Math.floor(r.height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener('resize',sizeCanvas);setTimeout(sizeCanvas,0);
function arrow(x1,y1,x2,y2,label,color='#67c7ff'){
 if(!simDisplay.vectors)return;
 ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
 const a=Math.atan2(y2-y1,x2-x1),h=10;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-h*Math.cos(a-.5),y2-h*Math.sin(a-.5));ctx.lineTo(x2-h*Math.cos(a+.5),y2-h*Math.sin(a+.5));ctx.closePath();ctx.fill();
 if(label){ctx.font='13px system-ui';ctx.fillText(label,(x1+x2)/2+6,(y1+y2)/2-6);}
}
function dragHandle(x,y,label='drag'){
 ctx.save();
 ctx.fillStyle='rgba(255,255,255,.12)';
 ctx.strokeStyle='#ffffff';
 ctx.lineWidth=2;
 ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fill();ctx.stroke();
 ctx.fillStyle='#ffffff';ctx.font='11px system-ui';ctx.fillText(label,x+14,y+4);
 ctx.restore();
}

function grid(w,h){
 if(!simDisplay.grid)return;
 ctx.strokeStyle='rgba(120,160,200,.10)';ctx.lineWidth=1;for(let x=0;x<w;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
}
function drawAxes(x,y,w,h,xLabel,yLabel){
 ctx.strokeStyle='#71849a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,y+h);ctx.lineTo(x+w,y+h);ctx.moveTo(x,y+h);ctx.lineTo(x,y);ctx.stroke();
 ctx.fillStyle='#9fb2c8';ctx.font='12px system-ui';ctx.fillText(xLabel,x+w-30,y+h-8);ctx.fillText(yLabel,x+7,y+14);
}
function projectileState(t,v){
 const r=v.angle*Math.PI/180,ux=v.speed*Math.cos(r),uy=v.speed*Math.sin(r),k=v.drag;
 if(k<1e-6) return {x:ux*t,y:uy*t-.5*9.81*t*t,vx:ux,vy:uy-9.81*t};
 const e=Math.exp(-k*t);
 return {x:ux*(1-e)/k,y:(uy+9.81/k)*(1-e)/k-9.81*t/k,vx:ux*e,vy:(uy+9.81/k)*e-9.81/k};
}
function projectileFlight(v){
 let t=.02,last=projectileState(t,v);
 while(t<20){t+=.02;const p=projectileState(t,v);if(p.y<0&&t>.1)return t;last=p;} return 20;
}
function drawSim(){
 const size=syncSimCanvas(),w=size.w,h=size.h;ctx.clearRect(0,0,w,h);grid(w,h);
 const id=sims[activeSim].id,v=simValues;
 ctx.fillStyle='#dceaff';ctx.font='14px system-ui';
 if(id==='vectors'){
  const o={x:w*.22,y:h*.72}, scale=Math.min(w,h)*.006,rad=v.angle*Math.PI/180,x=o.x+v.mag*Math.cos(rad)*scale,y=o.y-v.mag*Math.sin(rad)*scale;
  arrow(o.x,o.y,x,o.y,'Fₓ','#63d9a4');arrow(x,o.y,x,y,'Fᵧ','#ffd56a');arrow(o.x,o.y,x,y,'F','#67c7ff');
  ctx.setLineDash([5,5]);ctx.strokeStyle='#7389a1';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,o.y);ctx.stroke();ctx.setLineDash([]);
  dragHandle(x,y,'vector tip');ctx.fillStyle='#dceaff';ctx.fillText('Components form a right-angled vector triangle.',w*.52,h*.2);
 }
 if(id==='equilibrium'){
  const cx=w*.38,cy=h*.58,scale=Math.min(w,h)*.0045,r1=v.a1*Math.PI/180,r2=v.a2*Math.PI/180;
  const x1=cx+v.f1*Math.cos(r1)*scale,y1=cy-v.f1*Math.sin(r1)*scale;
  const x2=x1+v.f2*Math.cos(r2)*scale,y2=y1-v.f2*Math.sin(r2)*scale;
  arrow(cx,cy,x1,y1,'F₁','#67c7ff');arrow(x1,y1,x2,y2,'F₂','#63d9a4');arrow(x2,y2,cx,cy,'F₃','#ffd56a');
  dragHandle(x1,y1,'F₁');dragHandle(x2,y2,'F₂');ctx.fillStyle='#dceaff';ctx.fillText('Closed triangle → ΣF = 0',w*.60,h*.22);
  ctx.fillText('F₃ balances the resultant of F₁ + F₂',w*.55,h*.30);
 }
 if(id==='moments'){
  const py=h*.52,cx=w*.46,len=Math.min(w*.72,620);ctx.strokeStyle='#9db1c9';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(cx-len/2,py);ctx.lineTo(cx+len/2,py);ctx.stroke();
  ctx.fillStyle='#788aa0';ctx.beginPath();ctx.moveTo(cx,py);ctx.lineTo(cx-28,py+48);ctx.lineTo(cx+28,py+48);ctx.closePath();ctx.fill();
  const fx=cx+clamp(v.distance/1.2,0,1)*len*.42;arrow(fx,py-95,fx,py,'F','#ffd56a');
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,py+70);ctx.lineTo(fx,py+70);ctx.stroke();ctx.fillStyle='#dceaff';ctx.fillText(v.distance.toFixed(2)+' m',(cx+fx)/2-15,py+92);
  dragHandle(fx,py-92,'force');ctx.fillText('M = '+fmt(v.force*v.distance)+' N m',w*.68,h*.18);
 }
 if(id==='couplecom'){
  const cx=w*.48,cy=h*.48,beam=Math.min(w*.62,520),left=cx-beam/2,right=cx+beam/2;
  ctx.strokeStyle='#aebccc';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(left,cy);ctx.lineTo(right,cy);ctx.stroke();
  ctx.fillStyle='#788aa0';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-25,cy+44);ctx.lineTo(cx+25,cy+44);ctx.closePath();ctx.fill();
  const sepPx=clamp(v.sep,0.1,1)*beam*.55,fx1=cx-sepPx/2,fx2=cx+sepPx/2;
  arrow(fx1,cy+85,fx1,cy+15,'F','#67c7ff');arrow(fx2,cy-85,fx2,cy-15,'F','#67c7ff');
  const comX=cx+v.com*beam*.45;ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(comX,cy-12,9,0,Math.PI*2);ctx.fill();arrow(comX,cy-20,comX,cy+65,'W','#ff7b87');
  dragHandle(comX,cy-12,'COM');dragHandle(fx2,cy-62,'couple');ctx.fillStyle='#dceaff';ctx.fillText('couple M = '+fmt(v.force*v.sep)+' N m',30,34);ctx.fillText('centre of mass',comX-42,cy-38);
 }
 if(id==='motion'){
  const t=simTime%8,pos=v.u*t+.5*v.a*t*t,min=-80,max=220,x=40+(clamp(pos,min,max)-min)/(max-min)*(w-80),trackY=h*.32;
  ctx.strokeStyle='#6f8197';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(30,trackY+28);ctx.lineTo(w-30,trackY+28);ctx.stroke();ctx.fillStyle='#67c7ff';ctx.fillRect(x-34,trackY-20,68,36);ctx.fillStyle='#0b1726';ctx.beginPath();ctx.arc(x-22,trackY+20,11,0,Math.PI*2);ctx.arc(x+22,trackY+20,11,0,Math.PI*2);ctx.fill();
  arrow(x,trackY-50,x+clamp((v.u+v.a*t)*5,-120,120),trackY-50,'v','#63d9a4');
  const gx=65,gy=h*.55,gw=w-120,gh=h*.34;drawAxes(gx,gy,gw,gh,'t / s','v');
  ctx.strokeStyle='#ffd56a';ctx.lineWidth=3;ctx.beginPath();
  for(let i=0;i<=80;i++){const tt=8*i/80,vv=v.u+v.a*tt,px=gx+gw*tt/8,py=gy+gh*.5-vv*gh/60;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.stroke();
  const py=gy+gh*.5-(v.u+v.a*t)*gh/60;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(gx+gw*t/8,py,5,0,Math.PI*2);ctx.fill();dragHandle(gx,gy+gh*.5-v.u*gh/60,'u');dragHandle(gx+gw,gy+gh*.5-(v.u+v.a*8)*gh/60,'a');
 }
 if(id==='bounce'){
  const g=9.81,e=v.retain/100,base=h*.42,x=w*.25,t=simTime%6;let tt=t,vy=0,height=v.drop,cycle=0;
  while(cycle<5){const fall=Math.sqrt(2*height/g),up=e*Math.sqrt(2*g*height)/g*2;if(tt<=fall){height=Math.max(0,v.drop*Math.pow(e*e,cycle)-.5*g*tt*tt);vy=-g*tt;break;}tt-=fall;if(tt<=up){const vup=e*Math.sqrt(2*g*v.drop*Math.pow(e*e,cycle)),tau=tt;height=Math.max(0,vup*tau-.5*g*tau*tau);vy=vup-g*tau;break;}tt-=up;cycle++;}
  const scale=(h*.30)/Math.max(.5,v.drop),ballY=base-height*scale;ctx.strokeStyle='#6f8197';ctx.beginPath();ctx.moveTo(35,base+12);ctx.lineTo(w*.45,base+12);ctx.stroke();ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(x,ballY,11,0,Math.PI*2);ctx.fill();
  const gx=w*.53,gy=55,gw=w*.40,gh=h-110;drawAxes(gx,gy,gw,gh,'t','v');
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=2;ctx.beginPath();let time=0,hp=v.drop,vlaunch=0,first=true;
  for(let b=0;b<4;b++){const tf=Math.sqrt(2*hp/g);for(let i=0;i<=20;i++){const q=tf*i/20,vv=(b===0?0:vlaunch)-g*q,px=gx+gw*Math.min(1,time/6),py=gy+gh*.5-vv*gh/35;if(first){ctx.moveTo(px,py);first=false}else ctx.lineTo(px,py);time+=tf/20;}vlaunch=e*Math.sqrt(2*g*hp);hp=hp*e*e;}
  ctx.stroke();dragHandle(x,ballY,'ball');ctx.fillStyle='#dceaff';ctx.fillText('free-flight gradient ≈ −g',gx+8,gy+18);
 }
 if(id==='projectile'){
  const T=projectileFlight(v),pts=[];let maxX=1,maxY=1;
  for(let i=0;i<=160;i++){const tt=T*i/160,p=projectileState(tt,v);pts.push(p);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);}
  const sx=(w-90)/(maxX*1.08),sy=(h-105)/(maxY*1.35),base=h-45;
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=3;ctx.beginPath();pts.forEach((p,i)=>{const x=45+p.x*sx,y=base-p.y*sy;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();
  const t=simTime%Math.max(.2,T),p=projectileState(t,v),px=45+p.x*sx,py=base-p.y*sy;
  ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(px,py,9,0,Math.PI*2);ctx.fill();
  arrow(px,py,px+clamp(p.vx*3,-85,85),py,'vₓ','#63d9a4');arrow(px,py,px,py-clamp(p.vy*3,-85,85),'vᵧ','#ffb66a');dragHandle(45,base,'launch');
  ctx.strokeStyle='#6f8197';ctx.beginPath();ctx.moveTo(20,base+10);ctx.lineTo(w-20,base+10);ctx.stroke();
 }
 if(id==='terminal'){
  const t=simTime%8,vt=v.mass*9.81/v.k,speed=vt*(1-Math.exp(-v.k*t/v.mass)),drag=v.k*speed,weight=v.mass*9.81,result=weight-drag;
  const x=w*.30,y=70+(h-150)*(t/8);ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();
  arrow(x-25,y,x-25,y+clamp(weight*3,25,120),'mg','#ff7b87');arrow(x+25,y,x+25,y-clamp(drag*3,5,120),'drag','#63d9a4');
  const gx=w*.52,gy=55,gw=w*.40,gh=h-110;drawAxes(gx,gy,gw,gh,'t','speed');
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=100;i++){const tt=8*i/100,ss=vt*(1-Math.exp(-v.k*tt/v.mass)),px=gx+gw*i/100,py=gy+gh-(ss/(vt*1.1))*gh;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke();
  ctx.setLineDash([5,5]);ctx.strokeStyle='#ffd56a';const vy=gy+gh-(vt/(vt*1.1))*gh;ctx.beginPath();ctx.moveTo(gx,vy);ctx.lineTo(gx+gw,vy);ctx.stroke();ctx.setLineDash([]);dragHandle(x,y,'object');dragHandle(gx+gw*.86,vy,'vₜ');ctx.fillStyle='#dceaff';ctx.fillText('terminal speed',gx+8,vy-8);
 }
 if(id==='vehicle'){
  const vmax=Math.sqrt(Math.max(0,(v.drive-v.roll)/v.drag)),t=simTime%12,speed=vmax*(1-Math.exp(-t/3)),res=v.roll+v.drag*speed*speed,x=w*.32,y=h*.46;
  ctx.fillStyle='#67c7ff';ctx.fillRect(x-70,y-28,140,48);ctx.fillStyle='#081422';ctx.beginPath();ctx.arc(x-45,y+23,15,0,Math.PI*2);ctx.arc(x+45,y+23,15,0,Math.PI*2);ctx.fill();
  arrow(x-20,y-62,x+clamp(v.drive/30,30,180),y-62,'drive','#63d9a4');arrow(x+15,y-100,x-clamp(res/30,20,160),y-100,'resistance','#ff7b87');
  const gx=w*.55,gy=55,gw=w*.37,gh=h-110;drawAxes(gx,gy,gw,gh,'speed','force');
  const maxV=Math.max(5,vmax*1.25),maxF=Math.max(v.drive,v.roll+v.drag*maxV*maxV)*1.12;ctx.strokeStyle='#63d9a4';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(gx,gy+gh-v.drive/maxF*gh);ctx.lineTo(gx+gw,gy+gh-v.drive/maxF*gh);ctx.stroke();ctx.strokeStyle='#ff7b87';ctx.beginPath();for(let i=0;i<=80;i++){const ss=maxV*i/80,rr=v.roll+v.drag*ss*ss,px=gx+gw*i/80,py=gy+gh-rr/maxF*gh;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke();ctx.fillStyle='#dceaff';ctx.fillText('intersection = maximum steady speed',gx+5,gy+18);
 }
 if(id==='newton'){
  const y=h*.52,x=w*.5,r=v.drive-v.resist,a=r/v.mass;ctx.fillStyle='#67c7ff';ctx.fillRect(x-70,y-30,140,50);ctx.fillStyle='#07111f';ctx.beginPath();ctx.arc(x-45,y+24,16,0,Math.PI*2);ctx.arc(x+45,y+24,16,0,Math.PI*2);ctx.fill();
  arrow(x-10,y-65,x+clamp(v.drive/25,20,180),y-65,'drive','#63d9a4');arrow(x+10,y-105,x-clamp(v.resist/25,10,140),y-105,'resistance','#ff7b87');arrow(x,y+85,x+clamp(a*35,-140,140),y+85,'a','#ffd56a');
  dragHandle(x+clamp(v.drive/25,20,180),y-65,'drive');dragHandle(x-clamp(v.resist/25,10,140),y-105,'resist');ctx.fillStyle='#dceaff';ctx.fillText('ΣF = '+fmt(r)+' N',x-55,y+125);
 }
 if(id==='momentum'){
  const before=(simTime%6)<3,cy=h*.48;if(before){const p=simTime%3;drawCart(w*.24+v.v1*p*10,cy,Math.max(36,v.m1*16),'1');drawCart(w*.76+v.v2*p*10,cy,Math.max(36,v.m2*16),'2');}
  else{const fin=(v.m1*v.v1+v.m2*v.v2)/(v.m1+v.m2),p=(simTime%6)-3;drawCart(w*.5+fin*p*12,cy,Math.max(70,(v.m1+v.m2)*13),'1+2');}
  const pTot=v.m1*v.v1+v.m2*v.v2,fin=pTot/(v.m1+v.m2),kei=.5*v.m1*v.v1*v.v1+.5*v.m2*v.v2*v.v2,kef=.5*(v.m1+v.m2)*fin*fin;
  if(before){dragHandle(w*.24+v.v1*(simTime%3)*10,cy,'v₁');dragHandle(w*.76+v.v2*(simTime%3)*10,cy,'v₂');}ctx.fillStyle='#dceaff';ctx.fillText(before?'Before collision':'After: perfectly inelastic',30,35);ctx.fillText('p total = '+fmt(pTot)+' kg m s⁻¹',30,h-58);ctx.fillText('KE before = '+fmt(kei)+' J   KE after = '+fmt(kef)+' J',30,h-30);
 }
 if(id==='impulse'){
  const gx=70,gy=55,gw=w-130,gh=h-110;drawAxes(gx,gy,gw,gh,'time / s','force');
  const px=gx+gw*.5,top=gy+20;ctx.fillStyle='rgba(103,199,255,.20)';ctx.beginPath();ctx.moveTo(gx,gy+gh);ctx.lineTo(px,top);ctx.lineTo(gx+gw,gy+gh);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=3;ctx.stroke();dragHandle(px,top,'peak');ctx.fillStyle='#dceaff';ctx.fillText('peak '+fmt(v.peak)+' N',px-35,top-10);ctx.fillText('contact time '+fmt(v.time)+' s',gx+gw*.62,gy+gh-12);
 }
 if(id==='energy'){
  const ground=h-70,left=50,right=w*.63,top=70,p=(simTime%6)/6,x=left+(right-left)*p,y=top+(ground-top)*(1-Math.pow(1-p,2));
  ctx.strokeStyle='#7d91a9';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(left,top);ctx.quadraticCurveTo(w*.32,ground-20,right,ground);ctx.stroke();ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(x,y-12,13,0,Math.PI*2);ctx.fill();dragHandle(x,y-12,'scrub');
  const total=v.mass*9.81*v.height,frac=1-p,gpe=total*frac,usable=total*(1-v.loss/100),ke=Math.max(0,usable-gpe*(1-v.loss/100)),diss=total-ke-gpe;
  const bx=w*.70,bw=w*.22,maxH=h*.55;[['GPE',gpe,'#67c7ff'],['KE',ke,'#63d9a4'],['diss.',Math.max(0,diss),'#ffd56a']].forEach((b,i)=>{const bh=maxH*(b[1]/Math.max(1,total));ctx.fillStyle=b[2];ctx.fillRect(bx+i*bw/3,ground-bh,bw/4,bh);ctx.fillStyle='#dceaff';ctx.fillText(b[0],bx+i*bw/3,ground+20);});
 }
 if(id==='workgraph'){
  const gx=70,gy=55,gw=w-130,gh=h-110,maxF=Math.max(10,v.f0,v.f1)*1.15;drawAxes(gx,gy,gw,gh,'s / m','F / N');
  const y0=gy+gh-v.f0/maxF*gh,y1=gy+gh-v.f1/maxF*gh;
  ctx.fillStyle='rgba(99,217,164,.20)';ctx.beginPath();ctx.moveTo(gx,gy+gh);ctx.lineTo(gx,y0);ctx.lineTo(gx+gw,y1);ctx.lineTo(gx+gw,gy+gh);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#63d9a4';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx,y0);ctx.lineTo(gx+gw,y1);ctx.stroke();dragHandle(gx+gw,y1,'F₁,s');
  ctx.fillStyle='#dceaff';ctx.fillText('Area = work = '+fmt(.5*(v.f0+v.f1)*v.distance)+' J',gx+20,gy+30);
 }
 if(id==='motor'){
  const ground=h-65,x=w*.30,top=60,p=Math.min(1,(simTime%Math.max(v.time,1))/Math.max(v.time,1)),blockY=ground-(ground-top)*p,usefulE=v.mass*9.81*v.height,usefulP=usefulE/v.time,inputE=v.input*v.time,loss=Math.max(0,inputE-usefulE),eff=100*usefulP/v.input;
  ctx.strokeStyle='#aebccc';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,top-20);ctx.lineTo(x,ground);ctx.stroke();ctx.fillStyle='#60748a';ctx.fillRect(x-42,blockY-20,84,40);ctx.fillStyle='#fff';ctx.fillText(v.mass+' kg',x-18,blockY+5);
  dragHandle(x,blockY,'mass');ctx.fillStyle='#dceaff';ctx.fillText('input energy = '+fmt(inputE)+' J',w*.56,h*.26);ctx.fillText('useful GPE = '+fmt(usefulE)+' J',w*.56,h*.36);ctx.fillText('dissipated = '+fmt(loss)+' J',w*.56,h*.46);ctx.fillText('efficiency = '+fmt(eff)+'%',w*.56,h*.56);
 }
 if(id==='springenergy'){
  const gx=70,gy=55,gw=w*.56,gh=h-110,maxX=.32,maxF=Math.max(v.k*v.limit*1.35,v.k*v.ext*1.15,10);drawAxes(gx,gy,gw,gh,'extension / m','force / N');
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=100;i++){const x=maxX*i/100,F=x<=v.limit?v.k*x:v.k*v.limit+v.k*.35*(x-v.limit),px=gx+gw*x/maxX,py=gy+gh-F/maxF*gh;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke();
  const F=v.ext<=v.limit?v.k*v.ext:v.k*v.limit+v.k*.35*(v.ext-v.limit),px=gx+gw*v.ext/maxX,py=gy+gh-F/maxF*gh;ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(px,py,6,0,Math.PI*2);ctx.fill();dragHandle(px,py,'spring');ctx.setLineDash([5,5]);ctx.strokeStyle='#ffd56a';ctx.beginPath();ctx.moveTo(gx+gw*v.limit/maxX,gy);ctx.lineTo(gx+gw*v.limit/maxX,gy+gh);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#dceaff';ctx.fillText('proportional limit',gx+gw*v.limit/maxX+5,gy+18);
  const sx=w*.75,sy=h*.26;ctx.strokeStyle='#c7d4e2';ctx.lineWidth=3;ctx.beginPath();for(let y=0;y<120;y+=12){ctx.moveTo(sx-18+(y%24?36:0),sy+y);ctx.lineTo(sx+18-(y%24?36:0),sy+y+12)}ctx.stroke();ctx.fillStyle='#60748a';ctx.fillRect(sx-35,sy+135,70,38);
 }
 if(id==='collisiontypes'){
  const mode=Math.round(v.mode),cy=h*.48;let u1=0,u2=0,a=0,b=0,label='';if(mode===0){u1=v.speed;u2=0;a=b=v.m1*u1/(v.m1+v.m2);label='inelastic: stick';}else if(mode===1){u1=v.speed;u2=0;a=(v.m1-v.m2)/(v.m1+v.m2)*u1;b=(2*v.m1)/(v.m1+v.m2)*u1;label='ideal elastic';}else{u1=u2=0;a=v.speed;b=-v.m1*a/v.m2;label='explosion';}
  const before=(simTime%6)<3,p=simTime%3;if(before){drawCart(w*.30+u1*p*9,cy,Math.max(38,v.m1*18),'1');drawCart(w*.70+u2*p*9,cy,Math.max(38,v.m2*18),'2');}else{drawCart(w*.48+a*p*10,cy,Math.max(38,v.m1*18),'1');drawCart(w*.52+b*p*10,cy+70,Math.max(38,v.m2*18),'2');}
  dragHandle(w*.5,h*.82,'scrub/mode');const p0=v.m1*u1+v.m2*u2,p1=v.m1*a+v.m2*b,k0=.5*v.m1*u1*u1+.5*v.m2*u2*u2,k1=.5*v.m1*a*a+.5*v.m2*b*b;ctx.fillStyle='#dceaff';ctx.fillText(label,30,35);ctx.fillText('momentum: '+fmt(p0)+' → '+fmt(p1)+' kg m s⁻¹',30,h-58);ctx.fillText('kinetic energy: '+fmt(k0)+' → '+fmt(k1)+' J',30,h-30);
 }
 if(id==='density'){
  const bx=w*.25,by=h*.32,sx=Math.min(180,60+v.length*8),sy=Math.min(120,35+v.height*7),d=Math.min(70,20+v.width*5);
  ctx.fillStyle='rgba(103,199,255,.22)';ctx.strokeStyle='#67c7ff';ctx.lineWidth=2;
  ctx.beginPath();ctx.rect(bx,by,sx,sy);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+d,by-d);ctx.lineTo(bx+sx+d,by-d);ctx.lineTo(bx+sx,by);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(bx+sx,by);ctx.lineTo(bx+sx+d,by-d);ctx.lineTo(bx+sx+d,by+sy-d);ctx.lineTo(bx+sx,by+sy);ctx.closePath();ctx.fill();ctx.stroke();
  const V=v.length*v.width*v.height,rho=(v.mass/1000)/(V*1e-6);
  ctx.fillStyle='#dceaff';ctx.fillText(v.length+' cm',bx+sx*.35,by+sy+24);ctx.fillText(v.height+' cm',bx-5,by+sy*.5);ctx.fillText(v.width+' cm',bx+sx+12,by-18);
  dragHandle(bx+sx,by+sy,'size');dragHandle(bx+sx+d,by-d,'depth');ctx.fillText('mass = '+v.mass+' g',w*.62,h*.33);ctx.fillText('volume = '+fmt(V)+' cm³',w*.62,h*.43);ctx.fillText('ρ = '+fmt(rho)+' kg m⁻³',w*.62,h*.53);
 }
 if(id==='elasticity'){
  const A=v.area*1e-6,E=v.young*1e9,stress=v.force/A,strain=stress/E,ext=strain*v.length,base=65,pix=Math.min(h*.48,100+ext*1e5),wireX=w*.30;
  ctx.strokeStyle='#c7d4e2';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(wireX,base);ctx.lineTo(wireX,base+pix);ctx.stroke();ctx.fillStyle='#60748a';ctx.fillRect(wireX-50,base+pix,100,48);ctx.fillStyle='#fff';ctx.fillText(v.force+' N',wireX-17,base+pix+30);
  const gx=w*.52,gy=55,gw=w*.40,gh=h-110;drawAxes(gx,gy,gw,gh,'strain','stress');
  const maxStr=Math.max(.0005,strain*1.5),maxStress=Math.max(1e6,stress*1.5);ctx.strokeStyle='#67c7ff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx,gy+gh);ctx.lineTo(gx+gw*(strain/maxStr),gy+gh-gh*(stress/maxStress));ctx.stroke();
  ctx.fillStyle='#ffd56a';ctx.beginPath();ctx.arc(gx+gw*(strain/maxStr),gy+gh-gh*(stress/maxStress),6,0,Math.PI*2);ctx.fill();
 }
 if(id==='stressstrain'){
  const E=v.young*1e9,yieldPa=v.yield*1e6,epsY=yieldPa/E,br=v.break,maxStress=yieldPa*1.55,gx=70,gy=55,gw=w-130,gh=h-110;drawAxes(gx,gy,gw,gh,'strain','stress');
  function matStress(e){if(e>=br)return 0;if(e<=epsY)return E*e;return yieldPa+(v.yield*.22e6)*Math.log1p((e-epsY)*120);}
  ctx.strokeStyle='#67c7ff';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=120;i++){const e=br*i/120,s=matStress(e),px=gx+gw*(e/(br*1.08)),py=gy+gh-(s/maxStress)*gh;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke();
  const e=Math.min(v.strain,br),s=matStress(e),px=gx+gw*(e/(br*1.08)),py=gy+gh-(s/maxStress)*gh;ctx.fillStyle=v.strain>=br?'#ff7b87':'#ffd56a';ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fill();dragHandle(px,py,'strain');
  ctx.fillStyle='#dceaff';ctx.fillText('elastic',gx+15,gy+gh-55);ctx.fillText('plastic',gx+gw*.42,gy+55);ctx.fillText('fracture',gx+gw*.82,gy+95);
 }
}

function drawCart(x,y,width,label){ctx.fillStyle='#67c7ff';ctx.fillRect(x-width/2,y-24,width,38);ctx.fillStyle='#081422';ctx.beginPath();ctx.arc(x-width*.28,y+20,11,0,Math.PI*2);ctx.arc(x+width*.28,y+20,11,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(label,x-8,y);}
function animate(now){
 const dt=Math.min(.05,(now-last)/1000);last=now;if(running)simTime+=dt*(slow?.3:1);
 if(!simRenderError)drawSimSafely();
 updateReadout();
 requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
$('#playPause').addEventListener('click',()=>{running=!running;$('#playPause').textContent=running?'Pause':'Play';$('#simState').textContent=running?(slow?'Slow motion':'Running'):'Paused';});
$('#slowMotion').addEventListener('click',()=>{slow=!slow;$('#slowMotion').textContent=slow?'Normal speed':'Slow motion';$('#simState').textContent=running?(slow?'Slow motion':'Running'):'Paused';});
$('#stepSim').addEventListener('click',()=>{running=false;$('#playPause').textContent='Play';simTime+=.25;$('#simState').textContent='Stepped to '+fmt(simTime)+' s';updateReadout();drawSimSafely();});
$('#recordSim').addEventListener('click',()=>{const id=sims[activeSim].id;if(!simDataRecords[id])simDataRecords[id]=[];simDataRecords[id].push({variables:simVariablesText(),results:simResultsText()});if(simDataRecords[id].length>20)simDataRecords[id].shift();renderSimData();});
$('#clearSimData').addEventListener('click',()=>{simDataRecords[sims[activeSim].id]=[];renderSimData();});
$('#showGrid').addEventListener('change',e=>{simDisplay.grid=e.target.checked;drawSimSafely();});
$('#showVectors').addEventListener('change',e=>{simDisplay.vectors=e.target.checked;drawSimSafely();});
$('#showLiveInfo').addEventListener('change',e=>{simDisplay.live=e.target.checked;updateSimEnhancements();});
$('#resetSim').addEventListener('click',()=>{simTime=0;simRenderError=null;$('#simState')?.classList.remove('error');renderSim();requestAnimationFrame(drawSimSafely);});

const formulas = [
{id:'resultant',topic:'Vectors',name:'Perpendicular resultant',desc:'R = √(x² + y²)',when:'Use when two perpendicular vector components are known and you need the magnitude of the resultant.',assumptions:'The two components are at 90°.',common:'Do not add perpendicular magnitudes directly.',rearrange:'R = √(x²+y²)',inputs:[['x','x component',6,'N'],['y','y component',8,'N']],calc:v=>({steps:['Identify the perpendicular components: x = '+v.x+' N, y = '+v.y+' N.','R = √(x² + y²)','R = √('+v.x+'² + '+v.y+'²)'],answer:Math.hypot(v.x,v.y),unit:'N'})},
{id:'resultant-angle',topic:'Vectors',name:'Resultant direction',desc:'θ = tan⁻¹(y/x)',when:'Use with perpendicular components to find the direction of the resultant relative to the x-direction.',assumptions:'x and y are perpendicular and signs/directions have been chosen consistently.',common:'State the reference direction, such as “north of east”.',rearrange:'θ = tan⁻¹(opposite/adjacent)',inputs:[['x','horizontal component',6,'N'],['y','vertical component',8,'N']],calc:v=>({steps:['tanθ = y/x','θ = tan⁻¹('+v.y+'/'+v.x+')'],answer:Math.atan2(v.y,v.x)*180/Math.PI,unit:'°'})},
{id:'components',topic:'Vectors',name:'Resolve a vector',desc:'Fₓ = F cosθ; Fᵧ = F sinθ',when:'Use when a vector magnitude and angle are known and perpendicular components are required.',assumptions:'θ is measured from the x/horizontal axis. If it is measured from another axis, identify adjacent/opposite first.',common:'Do not choose sine/cosine from memory without checking how the angle is defined.',rearrange:'Fₓ = Fcosθ; Fᵧ = Fsinθ',inputs:[['F','vector magnitude',60,'N'],['theta','angle from horizontal',35,'°']],calc:v=>({steps:['Fₓ = F cosθ = '+v.F+' cos('+v.theta+'°)','Fᵧ = F sinθ = '+v.F+' sin('+v.theta+'°)'],answerText:'Fₓ = '+fmt(v.F*Math.cos(v.theta*Math.PI/180))+' N; Fᵧ = '+fmt(v.F*Math.sin(v.theta*Math.PI/180))+' N'})},
{id:'moment',topic:'Moments',name:'Moment of a force',desc:'M = Fd',when:'Use for the turning effect of one force about a pivot.',assumptions:'d is the perpendicular distance from the pivot to the force line of action.',common:'Do not use the sloping distance if it is not perpendicular.',rearrange:'M = Fd; F = M/d; d = M/F',inputs:[['F','force',40,'N'],['d','perpendicular distance',.35,'m']],calc:v=>({steps:['M = Fd','M = '+v.F+' × '+v.d],answer:v.F*v.d,unit:'N m'})},
{id:'couple',topic:'Moments',name:'Moment of a couple',desc:'M = Fs',when:'Use for two equal, opposite, parallel forces separated by a perpendicular distance.',assumptions:'s is the perpendicular separation between the two force lines of action.',common:'Do not multiply by 2. F × separation already gives the couple moment.',rearrange:'M = Fs',inputs:[['F','one force',18,'N'],['s','force separation',.30,'m']],calc:v=>({steps:['M = F × separation','M = '+v.F+' × '+v.s],answer:v.F*v.s,unit:'N m'})},
{id:'avgvelocity',topic:'Motion',name:'Average velocity',desc:'v̄ = Δs/Δt',when:'Use when total displacement and total time are known.',assumptions:'Displacement carries sign/direction.',common:'Average velocity uses displacement, not total distance.',rearrange:'v̄ = Δs/Δt',inputs:[['s','displacement',120,'m'],['t','time',15,'s']],calc:v=>({steps:['v̄ = Δs/Δt','v̄ = '+v.s+'/'+v.t],answer:v.s/v.t,unit:'m s⁻¹'})},
{id:'acceleration',topic:'Motion',name:'Acceleration',desc:'a = Δv/Δt',when:'Use for average acceleration over a time interval.',assumptions:'Velocity signs are measured using one consistent positive direction.',common:'Use change in velocity, not final velocity alone.',rearrange:'a = (v-u)/t',inputs:[['u','initial velocity',5,'m s⁻¹'],['v','final velocity',17,'m s⁻¹'],['t','time',4,'s']],calc:v=>({steps:['a = (v-u)/t','a = ('+v.v+' − '+v.u+')/'+v.t],answer:(v.v-v.u)/v.t,unit:'m s⁻²'})},
{id:'suvat1',topic:'Motion',name:'SUVAT: final velocity',desc:'v = u + at',when:'Use with constant acceleration when u, a and t are known.',assumptions:'Acceleration is constant for the whole interval.',common:'Check the sign of a, especially for vertical motion.',rearrange:'v=u+at; u=v-at; a=(v-u)/t; t=(v-u)/a',inputs:[['u','initial velocity',4,'m s⁻¹'],['a','acceleration',2,'m s⁻²'],['t','time',6,'s']],calc:v=>({steps:['v = u + at','v = '+v.u+' + '+v.a+'×'+v.t],answer:v.u+v.a*v.t,unit:'m s⁻¹'})},
{id:'suvat2',topic:'Motion',name:'SUVAT: average-velocity displacement',desc:'s = ½(u+v)t',when:'Use with constant acceleration when u, v and t are known.',assumptions:'Acceleration is constant.',common:'This is not valid for arbitrary changing acceleration.',rearrange:'s=½(u+v)t',inputs:[['u','initial velocity',4,'m s⁻¹'],['v','final velocity',16,'m s⁻¹'],['t','time',6,'s']],calc:v=>({steps:['s = ½(u+v)t','s = ½('+v.u+' + '+v.v+')×'+v.t],answer:.5*(v.u+v.v)*v.t,unit:'m'})},
{id:'suvat3',topic:'Motion',name:'SUVAT: no time',desc:'v² = u² + 2as',when:'Use with constant acceleration when time is not given or not needed.',assumptions:'Acceleration is constant.',common:'Take the square root only at the end and interpret the sign/direction physically.',rearrange:'v²=u²+2as; s=(v²-u²)/(2a)',inputs:[['u','initial velocity',8,'m s⁻¹'],['a','acceleration',3,'m s⁻²'],['s','displacement',20,'m']],calc:v=>({steps:['v² = u² + 2as','v² = '+v.u+'² + 2×'+v.a+'×'+v.s],answer:Math.sqrt(Math.max(0,v.u*v.u+2*v.a*v.s)),unit:'m s⁻¹'})},
{id:'suvat4',topic:'Motion',name:'SUVAT: displacement from u,a,t',desc:'s = ut + ½at²',when:'Use with constant acceleration when u, a and t are known and displacement is required.',assumptions:'Acceleration is constant.',common:'The ½ applies to the whole at² term.',rearrange:'s=ut+½at²',inputs:[['u','initial velocity',0,'m s⁻¹'],['a','acceleration',9.81,'m s⁻²'],['t','time',1.5,'s']],calc:v=>({steps:['s = ut + ½at²','s = '+v.u+'×'+v.t+' + ½×'+v.a+'×'+v.t+'²'],answer:v.u*v.t+.5*v.a*v.t*v.t,unit:'m'})},
{id:'freefallg',topic:'Motion',name:'Free-fall g from height and time',desc:'g = 2h/t²',when:'Use for an object released from rest when drag is neglected.',assumptions:'Initial vertical velocity is zero and acceleration is constant.',common:'This relationship is a special case of s=ut+½at².',rearrange:'h=½gt²; g=2h/t²',inputs:[['h','fall height',1.20,'m'],['t','fall time',.495,'s']],calc:v=>({steps:['h = ½gt²','g = 2h/t²','g = 2×'+v.h+'/'+v.t+'²'],answer:2*v.h/(v.t*v.t),unit:'m s⁻²'})},
{id:'projectile-components',topic:'Projectiles',name:'Projectile launch components',desc:'uₓ=u cosθ; uᵧ=u sinθ',when:'Use before solving projectile horizontal and vertical motion separately.',assumptions:'θ is measured above the horizontal.',common:'Both components share the same flight time but have different accelerations.',rearrange:'uₓ=u cosθ; uᵧ=u sinθ',inputs:[['u','launch speed',18,'m s⁻¹'],['theta','launch angle',30,'°']],calc:v=>({steps:['uₓ = u cosθ','uᵧ = u sinθ'],answerText:'uₓ = '+fmt(v.u*Math.cos(v.theta*Math.PI/180))+' m s⁻¹; uᵧ = '+fmt(v.u*Math.sin(v.theta*Math.PI/180))+' m s⁻¹'})},
{id:'newton',topic:'Forces',name:'Newton II',desc:'ΣF = ma',when:'Use when resultant force, mass and acceleration are linked.',assumptions:'Mass is constant.',common:'Use resultant force, not one force unless it is the only unbalanced force.',rearrange:'F=ma; a=F/m; m=F/a',inputs:[['F','resultant force',2400,'N'],['m','mass',1200,'kg']],calc:v=>({steps:['ΣF = ma','a = ΣF/m','a = '+v.F+'/'+v.m],answer:v.F/v.m,unit:'m s⁻²'})},
{id:'weight',topic:'Forces',name:'Weight',desc:'W = mg',when:'Use to calculate the gravitational force on a mass near Earth or another stated field strength.',assumptions:'g is approximately uniform over the height considered.',common:'Mass is measured in kg; weight is a force in N.',rearrange:'W=mg; m=W/g; g=W/m',inputs:[['m','mass',12,'kg'],['g','gravitational acceleration',9.81,'m s⁻²']],calc:v=>({steps:['W = mg','W = '+v.m+' × '+v.g],answer:v.m*v.g,unit:'N'})},
{id:'momentum',topic:'Momentum',name:'Momentum',desc:'p = mv',when:'Use for linear momentum of an object.',assumptions:'Use signed velocity in one-dimensional problems.',common:'Momentum is a vector.',rearrange:'p=mv; m=p/v; v=p/m',inputs:[['m','mass',.2,'kg'],['v','velocity',12,'m s⁻¹']],calc:v=>({steps:['p = mv','p = '+v.m+' × '+v.v],answer:v.m*v.v,unit:'kg m s⁻¹'})},
{id:'force-rate-momentum',topic:'Momentum',name:'Force from momentum change',desc:'F = Δp/Δt',when:'Use for average force when momentum changes over a measured time.',assumptions:'Returned value is average resultant force over the interval.',common:'Δp is final momentum minus initial momentum and may be negative.',rearrange:'F=Δp/Δt; Δp=FΔt',inputs:[['dp','change in momentum',-4,'kg m s⁻¹'],['t','interaction time',.08,'s']],calc:v=>({steps:['F = Δp/Δt','F = '+v.dp+'/'+v.t],answer:v.dp/v.t,unit:'N'})},
{id:'impulse',topic:'Momentum',name:'Impulse from average force',desc:'J = FΔt = Δp',when:'Use when average force and contact time are known.',assumptions:'F is constant or represents the average force.',common:'Impulse has units N s, equivalent to kg m s⁻¹.',rearrange:'J=FΔt=Δp',inputs:[['F','average force',850,'N'],['t','contact time',.06,'s']],calc:v=>({steps:['J = FΔt','J = '+v.F+' × '+v.t],answer:v.F*v.t,unit:'N s'})},
{id:'impulse-triangle',topic:'Momentum',name:'Impulse from triangular F–t graph',desc:'J = ½Fpeak t',when:'Use when the force–time graph is triangular.',assumptions:'The pulse is well represented by a triangle.',common:'Impulse is graph area, not peak force × time unless the graph is rectangular.',rearrange:'J=½bh for a triangular pulse',inputs:[['F','peak force',2400,'N'],['t','total contact time',.08,'s']],calc:v=>({steps:['J = area under F–t graph','triangle area = ½ × base × height','J = ½×'+v.t+'×'+v.F],answer:.5*v.F*v.t,unit:'N s'})},
{id:'sticking-collision',topic:'Momentum',name:'Sticking collision final velocity',desc:'v = (m₁u₁+m₂u₂)/(m₁+m₂)',when:'Use for a one-dimensional perfectly inelastic collision where the objects stick together.',assumptions:'External impulse during the collision is negligible.',common:'Use signed velocities and do not assume kinetic energy is conserved.',rearrange:'m₁u₁+m₂u₂=(m₁+m₂)v',inputs:[['m1','mass 1',1,'kg'],['u1','initial velocity 1',5,'m s⁻¹'],['m2','mass 2',2,'kg'],['u2','initial velocity 2',0,'m s⁻¹']],calc:v=>({steps:['Total momentum before = m₁u₁ + m₂u₂','Final combined mass = m₁+m₂','v = ('+v.m1+'×'+v.u1+' + '+v.m2+'×'+v.u2+')/('+v.m1+'+'+v.m2+')'],answer:(v.m1*v.u1+v.m2*v.u2)/(v.m1+v.m2),unit:'m s⁻¹'})},
{id:'workangle',topic:'Energy',name:'Work by a force at an angle',desc:'W = Fs cosθ',when:'Use for a constant force acting at angle θ to the displacement.',assumptions:'Force and angle are constant over the displacement.',common:'θ is the angle between force and displacement.',rearrange:'W=Fs cosθ',inputs:[['F','force',50,'N'],['s','displacement',4,'m'],['theta','angle to displacement',30,'°']],calc:v=>({steps:['W = Fs cosθ','W = '+v.F+'×'+v.s+'×cos('+v.theta+'°)'],answer:v.F*v.s*Math.cos(v.theta*Math.PI/180),unit:'J'})},
{id:'work-trapezium',topic:'Energy',name:'Variable-force work (linear F–s graph)',desc:'W = ½(F₀+F₁)s',when:'Use when force changes linearly with displacement.',assumptions:'The F–s graph between endpoints is a straight line.',common:'Work is the area under the F–s graph.',rearrange:'trapezium area = ½(sum of parallel sides)×width',inputs:[['F0','starting force',20,'N'],['F1','final force',80,'N'],['s','displacement',4,'m']],calc:v=>({steps:['W = area under force–displacement graph','W = ½(F₀+F₁)s','W = ½('+v.F0+'+'+v.F1+')×'+v.s],answer:.5*(v.F0+v.F1)*v.s,unit:'J'})},
{id:'ke',topic:'Energy',name:'Kinetic energy',desc:'Eₖ = ½mv²',when:'Use for translational kinetic energy.',assumptions:'Use speed magnitude in the energy calculation.',common:'Speed is squared, so doubling speed quadruples kinetic energy.',rearrange:'Eₖ=½mv²',inputs:[['m','mass',900,'kg'],['v','speed',20,'m s⁻¹']],calc:v=>({steps:['Eₖ = ½mv²','Eₖ = ½×'+v.m+'×'+v.v+'²'],answer:.5*v.m*v.v*v.v,unit:'J'})},
{id:'gpe',topic:'Energy',name:'GPE change near Earth',desc:'ΔEₚ = mgΔh',when:'Use for a modest vertical height change in an approximately uniform gravitational field.',assumptions:'g is constant over the height change.',common:'Use vertical height change, not path length.',rearrange:'ΔEₚ=mgΔh',inputs:[['m','mass',25,'kg'],['g','g',9.81,'m s⁻²'],['h','height change',4,'m']],calc:v=>({steps:['ΔEₚ = mgΔh','ΔEₚ = '+v.m+'×'+v.g+'×'+v.h],answer:v.m*v.g*v.h,unit:'J'})},
{id:'power-time',topic:'Energy',name:'Power from work and time',desc:'P = ΔW/Δt',when:'Use when an energy transfer/work amount and time are known.',assumptions:'This gives average power over the time interval.',common:'Power is a rate, measured in watts.',rearrange:'P=W/t; W=Pt; t=W/P',inputs:[['W','work/energy transferred',981,'J'],['t','time',5,'s']],calc:v=>({steps:['P = W/t','P = '+v.W+'/'+v.t],answer:v.W/v.t,unit:'W'})},
{id:'power-fv',topic:'Energy',name:'Mechanical power at speed',desc:'P = Fv',when:'Use when force is parallel to velocity, commonly at constant speed against resistance.',assumptions:'Force component is parallel to motion.',common:'If force is at an angle, use the component along the velocity.',rearrange:'P=Fv; F=P/v; v=P/F',inputs:[['F','force parallel to motion',700,'N'],['v','speed',20,'m s⁻¹']],calc:v=>({steps:['P = Fv','P = '+v.F+'×'+v.v],answer:v.F*v.v,unit:'W'})},
{id:'efficiency',topic:'Energy',name:'Efficiency',desc:'η = useful output / total input',when:'Use with either energy/energy or power/power.',assumptions:'Useful and input quantities must be the same type.',common:'Do not mix energy with power in the same ratio.',rearrange:'η=useful/input; percentage=η×100',inputs:[['useful','useful output',750,'J or W'],['input','total input',1000,'J or W']],calc:v=>({steps:['η = useful output / total input','η = '+v.useful+'/'+v.input,'percentage = η × 100'],answerText:'η = '+fmt(v.useful/v.input)+' = '+fmt(100*v.useful/v.input)+'%'})},
{id:'density',topic:'Materials',name:'Density',desc:'ρ = m/V',when:'Use for uniform bulk density.',assumptions:'Mass and volume refer to the same sample.',common:'Convert cm³ to m³ carefully: 1 cm³ = 10⁻⁶ m³.',rearrange:'ρ=m/V; m=ρV; V=m/ρ',inputs:[['m','mass',2.7,'kg'],['V','volume',.001,'m³']],calc:v=>({steps:['ρ = m/V','ρ = '+v.m+'/'+v.V],answer:v.m/v.V,unit:'kg m⁻³'})},
{id:'hooke',topic:'Materials',name:'Hooke’s law / spring constant',desc:'F = kΔL',when:'Use in the proportional Hookean region.',assumptions:'Force is proportional to extension.',common:'Extension is change in length, not total length.',rearrange:'F=kΔL; k=F/ΔL; ΔL=F/k',inputs:[['F','force',6,'N'],['x','extension',.024,'m']],calc:v=>({steps:['F = kΔL','k = F/ΔL','k = '+v.F+'/'+v.x],answer:v.F/v.x,unit:'N m⁻¹'})},
{id:'elasticenergy-force',topic:'Materials',name:'Elastic strain energy from F and extension',desc:'E = ½FΔL',when:'Use for a linear force–extension relation.',assumptions:'The material/spring is in the Hookean linear region.',common:'This is the triangular area under the F–extension graph.',rearrange:'E=½FΔL',inputs:[['F','final force',12,'N'],['x','extension',.040,'m']],calc:v=>({steps:['E = area under F–extension graph','E = ½FΔL','E = ½×'+v.F+'×'+v.x],answer:.5*v.F*v.x,unit:'J'})},
{id:'elasticenergy-k',topic:'Materials',name:'Elastic strain energy from k and extension',desc:'E = ½k(ΔL)²',when:'Use for a Hookean spring when k and extension are known.',assumptions:'The spring remains Hookean.',common:'Extension is squared.',rearrange:'E=½kx²',inputs:[['k','spring constant',160,'N m⁻¹'],['x','extension',.12,'m']],calc:v=>({steps:['F=kx and E=½Fx','Therefore E=½kx²','E = ½×'+v.k+'×'+v.x+'²'],answer:.5*v.k*v.x*v.x,unit:'J'})},
{id:'stress',topic:'Materials',name:'Tensile stress',desc:'σ = F/A',when:'Use for tensile force distributed across a cross-sectional area.',assumptions:'Force acts normally to the cross-section.',common:'Convert mm² to m² before substituting.',rearrange:'σ=F/A; F=σA; A=F/σ',inputs:[['F','tensile force',60,'N'],['A','cross-sectional area',2e-7,'m²']],calc:v=>({steps:['σ = F/A','σ = '+v.F+'/'+v.A],answer:v.F/v.A,unit:'Pa'})},
{id:'strain',topic:'Materials',name:'Tensile strain',desc:'ε = ΔL/L',when:'Use for fractional extension of a sample.',assumptions:'Extension and original length use the same length unit.',common:'Strain has no unit.',rearrange:'ε=ΔL/L',inputs:[['x','extension',.0012,'m'],['L','original length',2,'m']],calc:v=>({steps:['ε = ΔL/L','ε = '+v.x+'/'+v.L],answer:v.x/v.L,unit:''})},
{id:'wire-area',topic:'Materials',name:'Wire cross-sectional area from diameter',desc:'A = πd²/4',when:'Use when a circular wire diameter is measured.',assumptions:'The wire cross-section is circular.',common:'Diameter must be converted to metres before squaring for SI stress/Young modulus calculations.',rearrange:'A=πd²/4',inputs:[['d','wire diameter',.50,'mm']],calc:v=>{const dm=v.d*1e-3;return {steps:['Convert diameter: d = '+v.d+' mm = '+dm+' m','A = πd²/4'],answer:Math.PI*dm*dm/4,unit:'m²'}}},
{id:'young-stress',topic:'Materials',name:'Young modulus from stress and strain',desc:'E = σ/ε',when:'Use in the initial linear elastic stress–strain region.',assumptions:'The sample is within the linear elastic region.',common:'Young modulus measures stiffness, not breaking strength.',rearrange:'E=stress/strain',inputs:[['stress','tensile stress',1.5e8,'Pa'],['strain','tensile strain',7.5e-4,'']],calc:v=>({steps:['E = stress/strain','E = '+v.stress+'/'+v.strain],answer:v.stress/v.strain,unit:'Pa'})},
{id:'young-wire',topic:'Materials',name:'Young modulus from wire measurements',desc:'E = FL/(AΔL)',when:'Use in a wire experiment from force, original length, cross-sectional area and extension.',assumptions:'The wire is in the linear elastic region.',common:'Use original length L and extension ΔL as different quantities.',rearrange:'E=FL/(AΔL)',inputs:[['F','force',30,'N'],['L','original length',1.5,'m'],['A','area',1.26e-7,'m²'],['x','extension',.0018,'m']],calc:v=>({steps:['E = FL/(AΔL)','E = ('+v.F+'×'+v.L+')/('+v.A+'×'+v.x+')'],answer:v.F*v.L/(v.A*v.x),unit:'Pa'})},
{id:'g-gradient',topic:'Practicals',name:'RP3: g from h vs t² gradient',desc:'g = 2 × gradient',when:'Use when h is plotted on the y-axis against t² on the x-axis.',assumptions:'Release is from rest and drag is negligible enough for h=½gt².',common:'The graph gradient is g/2, not g.',rearrange:'h=(g/2)t² → g=2 gradient',inputs:[['gradient','best-fit gradient',4.91,'m s⁻²']],calc:v=>({steps:['h = (g/2)t²','gradient = g/2','g = 2×'+v.gradient],answer:2*v.gradient,unit:'m s⁻²'})},
{id:'young-gradient',topic:'Practicals',name:'RP4: Young modulus from graph gradient',desc:'E = gradient of stress–strain graph',when:'Use when stress is on the y-axis and strain is on the x-axis.',assumptions:'Take the gradient only from the initial linear elastic region.',common:'Do not use points beyond the linear elastic region.',rearrange:'E=Δstress/Δstrain',inputs:[['ds','change in stress',1.8e8,'Pa'],['de','change in strain',9e-4,'']],calc:v=>({steps:['E = Δstress/Δstrain','E = '+v.ds+'/'+v.de],answer:v.ds/v.de,unit:'Pa'})},
{id:'percent-uncertainty',topic:'Practicals',name:'Percentage uncertainty',desc:'% uncertainty = Δx/x × 100',when:'Use to express an absolute measurement uncertainty as a percentage.',assumptions:'Δx and x use the same units.',common:'Use the measured value in the denominator.',rearrange:'percentage uncertainty=(absolute uncertainty/value)×100',inputs:[['dx','absolute uncertainty',.01,'m'],['x','measured value',1.20,'m']],calc:v=>({steps:['% uncertainty = Δx/x × 100','% = '+v.dx+'/'+v.x+'×100'],answer:100*v.dx/v.x,unit:'%'})},
{id:'diameter-area-uncertainty',topic:'Practicals',name:'Diameter → area uncertainty',desc:'%ΔA ≈ 2 × %Δd',when:'Use for A∝d² in RP4 uncertainty estimates.',assumptions:'Small fractional uncertainties; standard percentage-uncertainty propagation.',common:'Diameter uncertainty is doubled because diameter is squared.',rearrange:'A∝d² → fractional uncertainty in A ≈ 2 fractional uncertainty in d',inputs:[['d','diameter',.50,'mm'],['dd','diameter uncertainty',.01,'mm']],calc:v=>({steps:['% uncertainty in d = Δd/d ×100','= '+v.dd+'/'+v.d+'×100','Because A ∝ d², % uncertainty in A ≈ 2×% uncertainty in d'],answer:2*100*v.dd/v.d,unit:'%'})},
{id:'energy-balance',topic:'Energy',name:'Energy balance with resistance',desc:'KE gain = GPE loss − dissipated energy',when:'Use for mechanical systems where resistance transfers some energy away from useful mechanical stores.',assumptions:'All significant transfers are included in the stated energy balance.',common:'Energy is transferred, not destroyed.',rearrange:'Einitial = Efinal + dissipated',inputs:[['m','mass',3,'kg'],['g','g',9.81,'m s⁻²'],['h','height lost',4,'m'],['loss','energy dissipated',25,'J']],calc:v=>({steps:['GPE decrease = mgΔh = '+v.m+'×'+v.g+'×'+v.h,'KE gain = GPE decrease − dissipated energy'],answer:v.m*v.g*v.h-v.loss,unit:'J'})},
{id:'motor-efficiency',topic:'Energy',name:'Motor lifting efficiency',desc:'η = (mgh/t) / Pin',when:'Use for the AQA motor-efficiency context when a mass is lifted through a measured height.',assumptions:'Useful output is the rate of gain of GPE.',common:'Use useful output power divided by electrical input power.',rearrange:'Puseful=mgh/t; η=Puseful/Pin',inputs:[['m','mass lifted',10,'kg'],['g','g',9.81,'m s⁻²'],['h','height',2,'m'],['t','time',4,'s'],['Pin','input power',650,'W']],calc:v=>{const p=v.m*v.g*v.h/v.t;return {steps:['Useful output power = mgh/t','Puseful = '+v.m+'×'+v.g+'×'+v.h+'/'+v.t+' = '+fmt(p)+' W','η=Puseful/Pin'],answerText:'η = '+fmt(p/v.Pin)+' = '+fmt(100*p/v.Pin)+'%'}}}
];

const formulaTopics=['All',...Array.from(new Set(formulas.map(f=>f.topic)))];
let visibleFormulaIndexes=formulas.map((_,i)=>i);

function formulaInfoHtml(f){
 return '<div class="formula-identity"><span class="eyebrow">'+f.topic+'</span><div class="formula-big">'+f.desc+'</div></div>'+
 '<div class="formula-teach-grid">'+
 '<div><strong>When to use it</strong><p>'+f.when+'</p></div>'+
 '<div><strong>Assumptions / limits</strong><p>'+f.assumptions+'</p></div>'+
 '<div><strong>Common mistake</strong><p>'+f.common+'</p></div>'+
 '<div><strong>Useful rearrangement</strong><p><code>'+f.rearrange+'</code></p></div>'+
 '</div>';
}

function renderFormula(){
 const topic=$('#formulaTopic');
 topic.innerHTML=formulaTopics.map(t=>'<option value="'+t+'">'+t+'</option>').join('');
 $('#formulaSearch').addEventListener('input',filterFormulaList);
 topic.addEventListener('change',filterFormulaList);
 $('#formulaRandom').addEventListener('click',()=>{
  const pool=visibleFormulaIndexes.length?visibleFormulaIndexes:formulas.map((_,i)=>i);
  const chosen=pool[Math.floor(Math.random()*pool.length)];
  filterFormulaList(chosen);
 });
 $('#formulaReset').addEventListener('click',renderFormulaInputs);
 $('#formulaSelect').addEventListener('change',renderFormulaInputs);
 filterFormulaList(0);
}

function filterFormulaList(forceIndex=null){
 const q=($('#formulaSearch')?.value||'').trim().toLowerCase();
 const topic=$('#formulaTopic')?.value||'All';
 visibleFormulaIndexes=formulas.map((f,i)=>({f,i})).filter(x=>(topic==='All'||x.f.topic===topic)&&(!q||(x.f.name+' '+x.f.desc+' '+x.f.when+' '+x.f.topic).toLowerCase().includes(q))).map(x=>x.i);
 if(!visibleFormulaIndexes.length) visibleFormulaIndexes=formulas.map((_,i)=>i);
 const select=$('#formulaSelect'),current=forceIndex!==null?forceIndex:Number(select.dataset.formulaIndex||visibleFormulaIndexes[0]);
 const chosen=visibleFormulaIndexes.includes(current)?current:visibleFormulaIndexes[0];
 select.innerHTML=visibleFormulaIndexes.map(i=>'<option value="'+i+'" '+(i===chosen?'selected':'')+'>'+formulas[i].name+' — '+formulas[i].desc+'</option>').join('');
 select.dataset.formulaIndex=chosen;
 renderFormulaInputs();
 $('#formulaCards').innerHTML=visibleFormulaIndexes.map(i=>{const f=formulas[i];return '<button class="formula-card formula-card-button" data-formula-open="'+i+'"><span class="eyebrow">'+f.topic+'</span><strong>'+f.name+'</strong><code>'+f.desc+'</code><small>'+f.when+'</small></button>'}).join('');
 $$('[data-formula-open]').forEach(b=>b.addEventListener('click',()=>{
  const i=Number(b.dataset.formulaOpen);$('#formulaTopic').value='All';$('#formulaSearch').value='';filterFormulaList(i);$('#formulaSelect').value=String(i);$('#formulaSelect').dataset.formulaIndex=i;renderFormulaInputs();window.scrollTo({top:220,behavior:'smooth'});
 }));
}

function renderFormulaInputs(){
 const i=Number($('#formulaSelect').value);
 const f=formulas[Number.isFinite(i)?i:0];
 $('#formulaSelect').dataset.formulaIndex=String(Number.isFinite(i)?i:0);
 $('#formulaInfo').innerHTML=formulaInfoHtml(f);
 $('#formulaInputs').innerHTML=f.inputs.map(x=>'<label class="field"><span>'+x[1]+' <em>'+x[3]+'</em></span><input type="number" step="any" data-finput="'+x[0]+'" value="'+x[2]+'"></label>').join('');
 $$('[data-finput]').forEach(x=>x.addEventListener('input',calculateFormula));
 calculateFormula();
}

function calculateFormula(){
 const i=Number($('#formulaSelect').value),f=formulas[Number.isFinite(i)?i:0],v={};
 $$('[data-finput]').forEach(inp=>v[inp.dataset.finput]=Number(inp.value));
 let r;
 try{r=f.calc(v);}catch(e){r={steps:['Check the entered values.'],answerText:'Unable to calculate with these inputs.'};}
 const steps=(r.steps||[]).map((s,n)=>'<span class="step"><b>'+(n+1)+'.</b> '+s+'</span>').join('');
 const finite=Number.isFinite(r.answer);
 const ans=r.answerText||(finite?('Answer = '+fmt(r.answer)+' '+(r.unit||'')):'Check the input values.');
 $('#formulaWorking').innerHTML=steps+'<span class="step formula-answer"><strong>'+ans+'</strong></span>';
 $('#formulaCheck').innerHTML='<strong>Exam check</strong><span>Relationship: '+f.desc+'</span><span>Units: '+(r.unit||'dimensionless / as stated')+'</span><span>Reasonableness: check sign, order of magnitude and significant figures.</span>';
}

const quiz = [
['3.4.1.1','Which is a vector quantity?',['Mass','Velocity','Energy','Time'],1,'Think: does direction matter?','Velocity has magnitude and direction.'],
['3.4.1.1','A 3 N east vector and 4 N north vector have resultant magnitude…',['1 N','5 N','7 N','12 N'],1,'Use Pythagoras.','√(3²+4²)=5 N.'],
['3.4.1.2','A 20 N force acts 0.40 m perpendicularly from a pivot. Moment?',['8 N m','50 N m','0.05 N m','20.4 N m'],0,'Use M = Fd.','20×0.40=8 N m.'],
['3.4.1.3','What is the area under a velocity–time graph?',['Acceleration','Displacement','Force','Power'],1,'Think about velocity × time.','The signed area gives displacement.'],
['3.4.1.3','A car changes velocity from 5 to 17 m s⁻¹ in 4 s. Acceleration?',['3 m s⁻²','5.5 m s⁻²','12 m s⁻²','48 m s⁻²'],0,'a=Δv/Δt.','(17−5)/4=3 m s⁻².'],
['3.4.1.4','For an ideal projectile, horizontal acceleration is…',['g','0','u cosθ','variable'],1,'Gravity acts vertically.','Without air resistance, horizontal acceleration is zero.'],
['3.4.1.4','At terminal speed…',['weight is zero','drag is zero','drag equals weight','acceleration equals g'],2,'Resultant force is zero.','Drag balances weight.'],
['3.4.1.5','A 2 kg object has resultant force 10 N. Acceleration?',['5 m s⁻²','20 m s⁻²','0.2 m s⁻²','12 m s⁻²'],0,'Use F=ma.','a=10/2=5 m s⁻².'],
['3.4.1.5','A Newton III pair acts…',['on the same object','on different interacting objects','only in equilibrium','only during collisions'],1,'Ask which objects experience the forces.','Third-law forces act on different objects.'],
['3.4.1.6','Momentum equals…',['mv','ma','½mv²','Fv'],0,'Definition.','p=mv.'],
['3.4.1.6','Area under a force–time graph gives…',['work','power','impulse','stress'],2,'Impulse equals change in momentum.','Area gives impulse.'],
['3.4.1.7','If speed doubles, kinetic energy…',['doubles','quadruples','halves','stays constant'],1,'KE∝v².','Doubling v gives four times KE.'],
['3.4.1.8','With friction, which remains conserved for a closed system?',['Mechanical energy only','Kinetic energy only','Total energy','Momentum in every case'],2,'Energy can transfer to internal stores.','Total energy is conserved.'],
['3.4.2.1','Hooke’s law applies while…',['force is zero','extension is proportional to force','material is broken','strain is always permanent'],1,'Look for the linear region.','In the Hookean region extension is proportional to force.'],
['3.4.2.1','Tensile strain has unit…',['Pa','N','m','no unit'],3,'It is a ratio of lengths.','The units cancel.'],
['3.4.2.1','Elastic strain energy for a linear spring is…',['FΔL','½FΔL','F/ΔL','½k/F'],1,'Area of triangle under F–extension graph.','E=½FΔL.'],
['3.4.2.2','Young modulus is…',['stress × strain','stress / strain','strain / stress','force / extension'],1,'Definition.','E=stress/strain in the linear elastic region.'],
['RP4','Why is wire diameter especially important in Young modulus?',['Area depends on d²','Force equals d²','Length equals d²','Strain has units of d²'],0,'Think A=πd²/4.','Area depends on diameter squared.'],
['3.4.1.1','For three coplanar forces acting at a point in equilibrium, their vectors…',['must have equal magnitudes','form a closed triangle','must all be at 90°','must all point upward'],1,'Think about the vector sum.','A zero vector sum means the force vectors can form a closed triangle.'],
['3.4.1.2','A couple produces a turning effect because…',['the forces act on the same line','the forces are unequal','equal opposite forces act along different lines','there is a resultant force'],2,'A couple has zero resultant force but separated lines of action.','The separation of the equal opposite forces gives a non-zero moment.'],
['3.4.1.3','Area under an acceleration–time graph gives…',['displacement','change in velocity','force','power'],1,'Consider acceleration × time.','The signed area gives change in velocity.'],
['3.4.1.3','On a displacement–time graph, instantaneous velocity is found from…',['area under the graph','gradient of a tangent','maximum displacement','intercept only'],1,'Instantaneous rate of change needs a tangent.','The tangent gradient gives instantaneous velocity.'],
['3.4.1.4','As a falling object speeds up through air, drag generally…',['decreases','stays zero','increases','reverses gravity'],2,'AQA requires this qualitative relationship.','Air resistance increases with speed.'],
['3.4.1.5','Newton’s first law applies when resultant force is zero. The object then…',['must be stationary','has constant velocity','must speed up','has zero mass'],1,'Zero resultant force means zero acceleration.','Velocity remains constant, which includes remaining at rest.'],
['3.4.1.6','A triangular force–time pulse has peak 1000 N and duration 0.20 s. Impulse is…',['50 N s','100 N s','200 N s','5000 N s'],1,'Find the triangle area.','½×1000×0.20=100 N s.'],
['3.4.1.6','In an explosion of an initially stationary closed system, total momentum after is…',['zero','always positive','equal to kinetic energy','equal to total mass'],0,'Use momentum conservation.','Initial momentum is zero, so the vector total after remains zero.'],
['3.4.1.7','A 50 N force acts through 4.0 m at 60° to displacement. Work done is…',['25 J','100 J','200 J','400 J'],1,'Use Fs cosθ.','50×4×cos60°=100 J.'],
['3.4.1.7','The area under a force–displacement graph is…',['impulse','work done','acceleration','strain'],1,'Do not confuse F–s with F–t.','Area under F–s is work done.'],
['3.4.1.7','A device receives 800 J and transfers 600 J usefully. Efficiency is…',['25%','60%','75%','133%'],2,'Useful/input ×100%.','600/800=0.75=75%.'],
['3.4.2.1','A sample has mass 0.50 kg and volume 2.0×10⁻⁴ m³. Density is…',['250 kg m⁻³','1000 kg m⁻³','2500 kg m⁻³','10000 kg m⁻³'],2,'Use ρ=m/V.','0.50/(2×10⁻⁴)=2500 kg m⁻³.'],
['3.4.2.1','Which statement best distinguishes elastic limit from limit of proportionality?',['They are always identical by definition','one concerns permanent deformation; the other concerns linear F–extension behaviour','elastic limit is a density','limit of proportionality is fracture'],1,'Think return-to-original-shape versus straight-line proportionality.','The elastic limit concerns recoverability; the limit of proportionality concerns proportional F–extension behaviour.'],
['3.4.2.2','Young modulus is obtained from the initial linear stress–strain graph using…',['area','gradient','x-intercept','maximum strain'],1,'E=stress/strain.','Young modulus is the gradient of the initial linear region.']
];
let qi=0,score=0,streak=0;
function renderQuiz(){
 const q=quiz[qi];$('#quizSpec').textContent='AQA '+q[0];$('#quizQuestion').textContent=q[1];$('#quizChoices').innerHTML=q[2].map((x,i)=>'<button class="choice-button" data-choice="'+i+'">'+x+'</button>').join('');
 $('#quizHint').textContent=q[4];$('#quizHint').classList.add('hidden');$('#quizFeedback').className='feedback hidden';$('#nextQuestion').classList.add('hidden');$('#showHint').textContent='Show hint';
 $('#quizProgress').textContent=(qi+1)+' / '+quiz.length;$('#quizProgressFill').style.width=(100*(qi+1)/quiz.length)+'%';$('#quizScore').textContent=score;$('#quizStreak').textContent=streak;
 $$('[data-choice]').forEach(b=>b.addEventListener('click',()=>{
  const chosen=Number(b.dataset.choice);$$('[data-choice]').forEach(x=>x.disabled=true);b.classList.add(chosen===q[3]?'correct':'wrong');$$('[data-choice]')[q[3]].classList.add('correct');
  if(chosen===q[3]){score++;streak++;}else streak=0;$('#quizScore').textContent=score;$('#quizStreak').textContent=streak;
  recordMastery(q[0],chosen===q[3]);
  const fb=$('#quizFeedback');fb.className='feedback '+(chosen===q[3]?'good':'bad');fb.textContent=(chosen===q[3]?'Correct. ':'Not quite. ')+q[5];$('#nextQuestion').classList.remove('hidden');
 }));
}
$('#showHint').addEventListener('click',()=>{$('#quizHint').classList.toggle('hidden');$('#showHint').textContent=$('#quizHint').classList.contains('hidden')?'Show hint':'Hide hint';});
$('#nextQuestion').addEventListener('click',()=>{qi=(qi+1)%quiz.length;renderQuiz();});
$('#restartQuiz').addEventListener('click',()=>{qi=0;score=0;streak=0;renderQuiz();});

const spec = [
['3.4.1.1','Scalars and vectors','Scalar/vector nature, examples, vector addition, resolution and equilibrium.','vectors'],
['3.4.1.2','Moments','Moments, couples, principle of moments and centre of mass.','moments'],
['3.4.1.3','Motion along a straight line','Displacement, velocity, acceleration, graphs, uniform acceleration and g.','kinematics'],
['RP3','Determination of g','Free-fall method, graphing and evaluation of errors.','rp3'],
['3.4.1.4','Projectile motion','Independent horizontal/vertical motion, friction, drag, lift and terminal speed.','projectiles'],
['3.4.1.5','Newton’s laws','Three laws, ΣF=ma and free-body diagrams.','newton'],
['3.4.1.6','Momentum','Momentum conservation, rate of change, impulse, force–time graphs and collisions.','momentum'],
['3.4.1.7','Work, energy and power','Work, kinetic/GPE, power, efficiency and force–displacement graphs.','work'],
['3.4.1.8','Conservation of energy','Energy conservation including work against resistive forces.','energy'],
['3.4.2.1','Bulk properties of solids','Density, Hooke’s law, stress, strain, elastic energy and material behaviour.','density-hooke'],
['3.4.2.2','Young modulus','Stress–strain gradient and Young modulus.','young'],
['RP4','Determination of Young modulus','Simple experimental method and uncertainty/evaluation.','rp4']
];
const specDetails = {
 '3.4.1.1':['scalar and vector nature with paired examples','vector addition by calculation and scale drawing','resolution into perpendicular components','inclined-plane force components','closed-triangle method','equilibrium for two or three coplanar forces','equilibrium at rest or constant velocity'],
 '3.4.1.2':['moment = force × perpendicular distance','couples and couple moment','principle of moments','centre of mass','centre of mass of a uniform regular solid'],
 '3.4.1.3':['displacement, speed, velocity and acceleration','average and instantaneous quantities','uniform and non-uniform motion graphs','v–t area = displacement','a–t area = change in velocity','s–t gradient = velocity','v–t gradient = acceleration','bouncing-ball graph interpretation','all four constant-acceleration equations','acceleration due to gravity'],
 'RP3':['free-fall determination of g','repeated readings and range of heights','random and systematic errors','h against t² linearisation','best-fit gradient and g=2×gradient','evaluation and uncertainty'],
 '3.4.1.4':['independent horizontal and vertical projectile motion','uniform-gravity SUVAT problems','qualitative friction','lift and drag','terminal speed','air resistance increasing with speed','drag effect on projectile trajectory','factors affecting vehicle maximum speed'],
 '3.4.1.5':['Newton’s first law','Newton’s second law for constant mass','Newton’s third law','resultant force calculations','free-body diagrams','experimental verification of Newton II'],
 '3.4.1.6':['p=mv','one-dimensional momentum conservation','force as rate of change of momentum','impulse = change in momentum','force–time graph area','variable force with time','impact force and contact time','elastic and inelastic collisions','explosions','transport-safety context'],
 '3.4.1.7':['W=Fs cosθ','kinetic energy','gravitational potential energy','power as energy-transfer rate','P=Fv','variable force calculations','force–displacement graph area','efficiency as fraction/percentage','motor-lifting efficiency investigation and errors'],
 '3.4.1.8':['conservation of energy','GPE–KE transfers','work against resistive forces','quantitative and qualitative energy balances','physical estimation'],
 '3.4.2.1':['density','Hooke’s law','spring constant/stiffness','limit of proportionality and elastic limit','tensile stress','tensile strain','elastic strain energy','breaking stress','plastic behaviour','fracture and brittle behaviour','force–extension interpretation','spring energy to kinetic/GPE','simple stress–strain curves','analogue/digital measurement ideas','volume/density estimation'],
 '3.4.2.2':['Young modulus definition','Young modulus from stress–strain gradient','simple measurement method','wire geometry and area'],
 'RP4':['Young modulus practical method','wire length and diameter measurements','force and extension data','stress and strain processing','best-fit stress–strain gradient','diameter/area uncertainty','random/systematic evaluation','remain in linear elastic region']
};

function renderSpec(){
 const host=$('#specGrid'); if(!host)return;
 host.innerHTML=spec.map(s=>'<article class="spec-card"><div class="status"><span class="eyebrow">'+s[0]+'</span><span class="status-dot '+(completed.has(s[3])?'done':'')+'"></span></div><h3>'+s[1]+'</h3><p>'+s[2]+'</p><details class="spec-detail"><summary>Show full coverage</summary><ul>'+(specDetails[s[0]]||[]).map(x=>'<li>'+x+'</li>').join('')+'</ul></details><span class="mastery-chip">'+(masteryPct(s[0])===null?'No mastery data yet':'Tracked mastery: '+masteryPct(s[0])+'%')+'</span><button class="text-button" data-spec-lesson="'+s[3]+'">Open lesson</button></article>').join('');
 $$('[data-spec-lesson]').forEach(b=>b.addEventListener('click',()=>{const i=lessons.findIndex(l=>l.id===b.dataset.specLesson);if(i>=0){activeLesson=i;renderCourseList();renderLesson();openView('course');}}));
}

function regression(points){
 if(points.length<2)return null;
 const n=points.length,sx=points.reduce((a,p)=>a+p.x,0),sy=points.reduce((a,p)=>a+p.y,0),sxx=points.reduce((a,p)=>a+p.x*p.x,0),sxy=points.reduce((a,p)=>a+p.x*p.y,0);
 const den=n*sxx-sx*sx;if(Math.abs(den)<1e-15)return null;
 const m=(n*sxy-sx*sy)/den,b=(sy-m*sx)/n;return {m,b};
}
function drawPracticalGraph(id,points,xLabel,yLabel){
 const canvas=document.getElementById(id);if(!canvas)return;
 const rect=canvas.getBoundingClientRect(),W=Math.max(320,rect.width||600),H=260,dpr=Math.min(2,window.devicePixelRatio||1);
 canvas.width=W*dpr;canvas.height=H*dpr;const g=canvas.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
 g.fillStyle='#091625';g.fillRect(0,0,W,H);const left=58,right=18,top=18,bottom=42,pw=W-left-right,ph=H-top-bottom;
 g.strokeStyle='#72859b';g.lineWidth=1.5;g.beginPath();g.moveTo(left,top);g.lineTo(left,H-bottom);g.lineTo(W-right,H-bottom);g.stroke();
 g.fillStyle='#9fb2c8';g.font='12px system-ui';g.fillText(xLabel,W/2-20,H-12);g.save();g.translate(14,H/2+20);g.rotate(-Math.PI/2);g.fillText(yLabel,0,0);g.restore();
 if(!points.length){g.fillText('Collect readings to build the graph.',left+20,top+40);return;}
 const maxX=Math.max(...points.map(p=>p.x),1e-9)*1.12,maxY=Math.max(...points.map(p=>p.y),1e-9)*1.12;
 const px=x=>left+(x/maxX)*pw,py=y=>H-bottom-(y/maxY)*ph;
 g.fillStyle='#ffd56a';points.forEach(p=>{g.beginPath();g.arc(px(p.x),py(p.y),5,0,Math.PI*2);g.fill();});
 const fit=regression(points);if(fit){g.strokeStyle='#67c7ff';g.lineWidth=2;g.beginPath();g.moveTo(px(0),py(Math.max(0,fit.b)));g.lineTo(px(maxX),py(fit.m*maxX+fit.b));g.stroke();}
}


const skillState = JSON.parse(localStorage.getItem('mechanicsSkillState')||'{"correct":0,"attempts":0}');
let currentSkill=null;
function rint(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function skillMeta(type){
 const map={
  gradient:['MS 3.5–3.7','Gradient links graph shape to a physical rate of change.'],
  vtarea:['MS 3.5–3.7','Area under a velocity–time graph gives displacement.'],
  impulse:['3.4.1.6 / MS','Area under a force–time graph gives impulse = change in momentum.'],
  uncertainty:['PS 3.3','Percentage uncertainty = absolute uncertainty ÷ measured value × 100%.'],
  poweruncertainty:['PS 3.3 / RP4','For a quantity raised to a power, multiply the percentage uncertainty by that power.'],
  linearise:['PS 3.1 / MS 3.9','Choose transformed axes so a power-law relationship becomes a straight line.'],
  sigfig:['MS 1.1','Round the final answer to a sensible number of significant figures.']
 };return map[type]||['MS / PS',''];
}
function generateSkillQuestion(){
 const type=$('#skillSelect')?.value||'gradient',meta=skillMeta(type);
 let q={type,code:meta[0],summary:meta[1],kind:'number',answer:0,tol:.01,worked:'',graph:null};
 if(type==='gradient'){
  const dx=rint(2,6),m=rint(2,8),b=rint(0,5),x2=dx,y1=b,y2=b+m*dx;
  q.question='A straight-line graph passes through (0, '+y1+') and ('+x2+', '+y2+'). Calculate its gradient.';
  q.answer=m;q.tol=.01;q.worked='gradient = Δy/Δx = ('+y2+' − '+y1+') / ('+x2+' − 0) = '+m+'.';
  q.graph={mode:'line',points:[{x:0,y:y1},{x:x2,y:y2}],x:'x',y:'y'};
 }else if(type==='vtarea'){
  const u=rint(1,8),v=u+rint(4,12),t=rint(3,8),s=.5*(u+v)*t;
  q.question='Velocity increases uniformly from '+u+' m s⁻¹ to '+v+' m s⁻¹ in '+t+' s. Use the area under the velocity–time graph to calculate displacement.';
  q.answer=s;q.tol=.05;q.worked='Area of trapezium = ½(u+v)t = ½('+u+'+'+v+')×'+t+' = '+s+' m.';
  q.graph={mode:'trapezium',u,v,t,x:'t / s',y:'v / m s⁻¹'};
 }else if(type==='impulse'){
  const peak=rint(4,20)*100,time=rint(4,15)/100,J=.5*peak*time;
  q.question='A triangular force pulse has peak force '+peak+' N and duration '+time.toFixed(2)+' s. Calculate the impulse.';
  q.answer=J;q.tol=.05;q.worked='Impulse = area under F–t graph = ½ × '+peak+' × '+time.toFixed(2)+' = '+J.toFixed(2)+' N s.';
  q.graph={mode:'triangle',peak,time,x:'t / s',y:'F / N'};
 }else if(type==='uncertainty'){
  const value=rint(20,120)/10,unc=rint(1,8)/100,pct=100*unc/value;
  q.question='A length is measured as '+value.toFixed(1)+' ± '+unc.toFixed(2)+' m. Calculate the percentage uncertainty.';
  q.answer=pct;q.tol=.08;q.worked='percentage uncertainty = ('+unc.toFixed(2)+' / '+value.toFixed(1)+') × 100 = '+pct.toFixed(2)+'%.';
 }else if(type==='poweruncertainty'){
  const d=rint(30,80)/100,unc=rint(1,4)/100,pct=2*100*unc/d;
  q.question='A wire diameter is '+d.toFixed(2)+' ± '+unc.toFixed(2)+' mm. Area depends on d². Estimate the percentage uncertainty in cross-sectional area.';
  q.answer=pct;q.tol=.12;q.worked='Diameter % uncertainty = ('+unc.toFixed(2)+'/'+d.toFixed(2)+')×100. Because A ∝ d², double it: '+pct.toFixed(2)+'%.';
 }else if(type==='linearise'){
  const choose=Math.random()<.5;
  q.kind='text';
  if(choose){
   q.question='For free fall from rest, h = ½gt². To obtain a straight line with h on the y-axis, what should be plotted on the x-axis?';
   q.keywords=['t','2'];q.worked='Plot h against t². The gradient is g/2.';
  }else{
   q.question='Young modulus E = stress/strain. To obtain E directly as a graph gradient, what should be on the y-axis and x-axis?';
   q.keywords=['stress','strain'];q.worked='Plot stress on the y-axis against strain on the x-axis. The gradient is E in the linear elastic region.';
  }
 }else if(type==='sigfig'){
  const raw=rint(12345,98765)/1000,sf=rint(2,4);
  const ans=Number(raw.toPrecision(sf));
  q.question='Round '+raw+' to '+sf+' significant figures.';
  q.answer=ans;q.tol=Math.max(1e-10,Math.abs(ans)*1e-9);q.worked=raw+' to '+sf+' significant figures is '+ans+'.';
 }
 currentSkill=q;
 $('#skillCode').textContent=q.code;
 $('#skillQuestion').textContent=q.question;
 $('#skillSummary').textContent=q.summary;
 $('#skillAnswer').value='';
 $('#skillFeedback').className='feedback hidden';
 $('#skillWorked').className='worked hidden';
 $('#skillWorked').textContent='';
 drawSkillGraph(q.graph);
 renderSkillStats();
}
function renderSkillStats(){
 if(!$('#skillCorrect'))return;
 $('#skillCorrect').textContent=skillState.correct||0;
 $('#skillAttempts').textContent=skillState.attempts||0;
}
function drawSkillGraph(graph){
 const canvas=$('#skillCanvas');if(!canvas)return;
 const r=canvas.getBoundingClientRect(),W=Math.max(320,r.width||620),H=280,dpr=Math.min(2,window.devicePixelRatio||1);
 canvas.width=W*dpr;canvas.height=H*dpr;const g=canvas.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
 g.fillStyle='#091625';g.fillRect(0,0,W,H);
 if(!graph){g.fillStyle='#9fb2c8';g.font='13px system-ui';g.fillText('This question is calculation/data-analysis based.',28,42);return;}
 const L=58,R=20,T=22,B=44,pw=W-L-R,ph=H-T-B;
 g.strokeStyle='#71849a';g.lineWidth=1.5;g.beginPath();g.moveTo(L,T);g.lineTo(L,H-B);g.lineTo(W-R,H-B);g.stroke();
 g.fillStyle='#9fb2c8';g.font='12px system-ui';g.fillText(graph.x,W/2,H-12);g.save();g.translate(15,H/2);g.rotate(-Math.PI/2);g.fillText(graph.y,0,0);g.restore();
 if(graph.mode==='line'){
  const maxX=Math.max(...graph.points.map(p=>p.x),1)*1.15,maxY=Math.max(...graph.points.map(p=>p.y),1)*1.15;
  const px=x=>L+x/maxX*pw,py=y=>H-B-y/maxY*ph;g.strokeStyle='#67c7ff';g.lineWidth=3;g.beginPath();
  graph.points.forEach((p,i)=>i?g.lineTo(px(p.x),py(p.y)):g.moveTo(px(p.x),py(p.y)));g.stroke();
  g.fillStyle='#ffd56a';graph.points.forEach(p=>{g.beginPath();g.arc(px(p.x),py(p.y),5,0,Math.PI*2);g.fill();});
 }else if(graph.mode==='trapezium'){
  const maxY=graph.v*1.15,px=t=>L+t/graph.t*pw,py=v=>H-B-v/maxY*ph;
  g.fillStyle='rgba(103,199,255,.18)';g.beginPath();g.moveTo(L,H-B);g.lineTo(L,py(graph.u));g.lineTo(W-R,py(graph.v));g.lineTo(W-R,H-B);g.closePath();g.fill();
  g.strokeStyle='#67c7ff';g.lineWidth=3;g.beginPath();g.moveTo(L,py(graph.u));g.lineTo(W-R,py(graph.v));g.stroke();
 }else if(graph.mode==='triangle'){
  const maxY=graph.peak*1.15,py=v=>H-B-v/maxY*ph;
  g.fillStyle='rgba(255,213,106,.18)';g.beginPath();g.moveTo(L,H-B);g.lineTo(L+pw/2,py(graph.peak));g.lineTo(W-R,H-B);g.closePath();g.fill();
  g.strokeStyle='#ffd56a';g.lineWidth=3;g.stroke();
 }
}
function checkSkillAnswer(){
 if(!currentSkill)return;
 const raw=$('#skillAnswer').value.trim(),fb=$('#skillFeedback'),worked=$('#skillWorked');let ok=false;
 if(currentSkill.kind==='text'){
  const t=raw.toLowerCase();ok=(currentSkill.keywords||[]).every(k=>t.includes(k));
 }else{
  const v=Number(raw.replace('%',''));ok=Number.isFinite(v)&&Math.abs(v-currentSkill.answer)<=currentSkill.tol;
 }
 skillState.attempts=(skillState.attempts||0)+1;if(ok)skillState.correct=(skillState.correct||0)+1;
 localStorage.setItem('mechanicsSkillState',JSON.stringify(skillState));
 fb.className='feedback '+(ok?'good':'bad');fb.textContent=ok?'Correct.':'Not quite — compare your method with the worked solution.';
 worked.className='worked';worked.textContent=currentSkill.worked;
 const code=currentSkill.type==='impulse'?'3.4.1.6':currentSkill.type==='vtarea'||currentSkill.type==='gradient'?'3.4.1.3':currentSkill.type==='poweruncertainty'?'RP4':currentSkill.type==='linearise'?'RP3':null;
 if(code)recordMastery(code,ok);
 renderSkillStats();
}
if($('#skillSelect')){
 $('#skillSelect').addEventListener('change',generateSkillQuestion);
 $('#newSkillQuestion').addEventListener('click',generateSkillQuestion);
 $('#checkSkillAnswer').addEventListener('click',checkSkillAnswer);
 $('#skillAnswer').addEventListener('keydown',e=>{if(e.key==='Enter')checkSkillAnswer();});
}

const structuredProblems=[
 {
  id:'motion-data',code:'3.4.1.3',title:'Motion graph investigation',max:7,
  stem:'A trolley accelerates uniformly from 2.0 m s⁻¹ to 14.0 m s⁻¹ in 6.0 s, then travels at 14.0 m s⁻¹ for 4.0 s.',
  parts:[
   {q:'Calculate the acceleration during the first 6.0 s.',marks:2,guide:'Use a = Δv/Δt. Answer: 2.0 m s⁻².',points:['correct change in velocity','division by 6.0 s with unit']},
   {q:'Calculate the displacement during the full 10.0 s.',marks:3,guide:'Area under v–t graph: trapezium first 6 s = 48 m; rectangle next 4 s = 56 m; total = 104 m.',points:['first area','second area','correct total with unit']},
   {q:'Explain what the gradient and area of a velocity–time graph represent.',marks:2,guide:'Gradient represents acceleration; signed area represents displacement.',points:['gradient = acceleration','area = displacement']}
  ]
 },
 {
  id:'collision',code:'3.4.1.6',title:'Collision + energy',max:8,
  stem:'A 0.40 kg trolley moving at 5.0 m s⁻¹ collides with a 0.60 kg stationary trolley. They stick together.',
  parts:[
   {q:'Calculate their common speed after the collision.',marks:3,guide:'Momentum before = 0.40×5.0 = 2.0 kg m s⁻¹. Total mass = 1.00 kg, so v = 2.0 m s⁻¹.',points:['initial momentum','conservation equation','final speed']},
   {q:'Calculate the kinetic energy transferred away from the trolleys during the collision.',marks:3,guide:'Initial KE = 5.0 J. Final KE = 2.0 J. Transfer = 3.0 J.',points:['initial KE','final KE','difference']},
   {q:'State why momentum can be conserved while kinetic energy is not.',marks:2,guide:'Momentum is conserved in a closed system; kinetic energy can be transferred to internal energy, sound and deformation.',points:['closed-system momentum idea','energy transferred to other stores']}
  ]
 },
 {
  id:'energy-power',code:'3.4.1.7',title:'Motor efficiency + power',max:7,
  stem:'A motor raises a 12 kg load vertically by 2.5 m in 4.0 s. The electrical input power is 900 W.',
  parts:[
   {q:'Calculate the useful increase in gravitational potential energy.',marks:2,guide:'ΔEₚ = mgh = 12×9.81×2.5 = 294 J (3 s.f.).',points:['correct equation/substitution','correct energy with unit']},
   {q:'Calculate the useful output power.',marks:2,guide:'P = E/t = 294/4.0 = 73.6 W.',points:['energy divided by time','correct power with unit']},
   {q:'Calculate the efficiency of the motor.',marks:2,guide:'Efficiency = useful power/input power = 73.6/900 = 0.0817 = 8.17%.',points:['correct ratio','correct percentage']},
   {q:'Give one reason the efficiency is below 100%.',marks:1,guide:'Energy is transferred to other stores, for example heating due to electrical/mechanical resistance.',points:['valid dissipative transfer']}
  ]
 },
 {
  id:'materials',code:'3.4.2.1–2',title:'Wire stress, strain and Young modulus',max:8,
  stem:'A wire has original length 1.80 m and diameter 0.50 mm. A tensile force of 35 N produces an extension of 1.60 mm.',
  parts:[
   {q:'Calculate the cross-sectional area of the wire.',marks:2,guide:'A=πd²/4 with d=5.0×10⁻⁴ m gives about 1.96×10⁻⁷ m².',points:['diameter converted to metres','correct circular area']},
   {q:'Calculate the tensile stress.',marks:2,guide:'stress = F/A ≈ 1.78×10⁸ Pa.',points:['F/A','correct value/unit']},
   {q:'Calculate the tensile strain.',marks:2,guide:'strain = ΔL/L = 1.60×10⁻³ / 1.80 ≈ 8.89×10⁻⁴.',points:['extension converted to metres','correct dimensionless ratio']},
   {q:'Calculate the Young modulus.',marks:2,guide:'E = stress/strain ≈ 2.00×10¹¹ Pa.',points:['correct relationship','correct value/unit']}
  ]
 },
 {
  id:'rp3-eval',code:'RP3',title:'Required Practical 3 evaluation',max:8,
  stem:'A student determines g by measuring drop height h and fall time t, then plots h against t².',
  parts:[
   {q:'Explain why h against t² should be a straight line.',marks:2,guide:'For release from rest, h=½gt², so h is directly proportional to t².',points:['correct equation','direct proportionality']},
   {q:'State how g is obtained from the graph gradient.',marks:2,guide:'gradient = g/2, therefore g = 2 × gradient.',points:['gradient relation','rearrangement to g']},
   {q:'Explain one random error and one suitable improvement.',marks:2,guide:'For example timing scatter can be reduced with electronic timing/repeats and a mean.',points:['specific random source','linked improvement']},
   {q:'Explain why repeating readings does not remove a systematic timing offset.',marks:2,guide:'A systematic offset shifts all readings in a similar direction, so averaging preserves the bias.',points:['consistent bias idea','averaging does not remove it']}
  ]
 },
 {
  id:'rp4-eval',code:'RP4',title:'Required Practical 4 evaluation',max:8,
  stem:'A student determines Young modulus from a wire using force, original length, extension and diameter measurements.',
  parts:[
   {q:'Explain why diameter should be measured several times at different positions and orientations.',marks:2,guide:'The wire may not have perfectly uniform/circular diameter; multiple readings allow a representative mean.',points:['variation/non-circularity','use of mean']},
   {q:'Explain why diameter uncertainty has a strong effect on Young modulus.',marks:2,guide:'Area A=πd²/4, so percentage uncertainty in d is approximately doubled in A.',points:['area depends on d²','uncertainty consequence']},
   {q:'Describe how a stress–strain graph can be used to obtain Young modulus.',marks:2,guide:'Plot stress on y-axis against strain on x-axis and take the gradient of the initial straight-line region.',points:['correct axes','gradient of linear region']},
   {q:'Why should the wire remain in the elastic region during the measurement?',marks:2,guide:'So deformation is recoverable and the linear stress/strain Young-modulus relationship remains valid.',points:['recoverable deformation','valid linear model']}
  ]
 }
];
let structuredIndex=0;
const structuredMarks=JSON.parse(localStorage.getItem('mechanicsStructuredMarks')||'{}');
const structuredAnswers=JSON.parse(localStorage.getItem('mechanicsStructuredAnswers')||'{}');
function renderStructured(){
 if(!$('#structuredTabs'))return;
 $('#structuredTabs').innerHTML=structuredProblems.map((p,i)=>'<button class="sim-tab '+(i===structuredIndex?'active':'')+'" data-structured="'+i+'">'+p.title+'</button>').join('');
 const p=structuredProblems[structuredIndex];
 const awarded=(structuredMarks[p.id]||[]);
 const total=awarded.reduce((a,b)=>a+(Number(b)||0),0);
 $('#structuredProblem').innerHTML='<div class="structured-head"><span class="eyebrow">'+p.code+'</span><h3>'+p.title+'</h3><p>'+p.stem+'</p><div class="equation">Self-marked score: <strong id="structuredTotal">'+total+' / '+p.max+'</strong></div></div>'+
  p.parts.map((part,i)=>{
   const key=p.id+'::'+i,ans=structuredAnswers[key]||'',mark=awarded[i]??'';
   return '<article class="structured-part"><div class="structured-q"><strong>Part '+String.fromCharCode(97+i)+'.</strong><span>'+part.q+'</span><span class="pill">'+part.marks+' mark'+(part.marks===1?'':'s')+'</span></div><textarea class="student-answer" data-structured-answer="'+i+'" placeholder="Write your answer...">'+ans+'</textarea><button class="text-button" data-structured-reveal="'+i+'">Reveal mark guidance</button><div class="answer-reveal" data-structured-guide="'+i+'"><p>'+part.guide+'</p><ul>'+part.points.map(x=>'<li>'+x+'</li>').join('')+'</ul><label class="field compact-field"><span>Marks awarded</span><input type="number" min="0" max="'+part.marks+'" step="1" data-structured-mark="'+i+'" value="'+mark+'"></label></div></article>';
  }).join('');
 $$('[data-structured]').forEach(b=>b.addEventListener('click',()=>{structuredIndex=Number(b.dataset.structured);renderStructured();}));
 $$('[data-structured-answer]').forEach(t=>t.addEventListener('input',()=>{
   structuredAnswers[p.id+'::'+t.dataset.structuredAnswer]=t.value;localStorage.setItem('mechanicsStructuredAnswers',JSON.stringify(structuredAnswers));
 }));
 $$('[data-structured-reveal]').forEach(b=>b.addEventListener('click',()=>{
   const guide=$('[data-structured-guide="'+b.dataset.structuredReveal+'"]');guide.classList.toggle('visible');b.textContent=guide.classList.contains('visible')?'Hide mark guidance':'Reveal mark guidance';
 }));
 $$('[data-structured-mark]').forEach(inp=>inp.addEventListener('input',()=>{
   const i=Number(inp.dataset.structuredMark),max=p.parts[i].marks,val=clamp(Number(inp.value)||0,0,max);
   if(!structuredMarks[p.id])structuredMarks[p.id]=[];structuredMarks[p.id][i]=val;localStorage.setItem('mechanicsStructuredMarks',JSON.stringify(structuredMarks));
   const t=structuredMarks[p.id].reduce((a,b)=>a+(Number(b)||0),0);$('#structuredTotal').textContent=t+' / '+p.max;
 }));
}

let gData=[],yData=[];
function updatePracticalControls(){
 $('#dropHeightOut').textContent=(Number($('#dropHeight').value)/100).toFixed(2)+' m';
 $('#loadMassOut').textContent=Number($('#loadMass').value).toFixed(1)+' kg';
 $('#wireDiameterOut').textContent=Number($('#wireDiameter').value).toFixed(2)+' mm';
 $('#massBlock').textContent=Number($('#loadMass').value).toFixed(1)+' kg';
}
['dropHeight','loadMass','wireDiameter'].forEach(id=>$('#'+id).addEventListener('input',updatePracticalControls));
$$('[data-practical]').forEach(b=>b.addEventListener('click',()=>{
 const g=b.dataset.practical==='g';$('#practicalG').classList.toggle('hidden',!g);$('#practicalYoung').classList.toggle('hidden',g);$$('[data-practical]').forEach(x=>x.classList.toggle('primary',x===b));requestAnimationFrame(()=>g?renderG():renderY());
}));
function renderG(){
 $('#gRows').innerHTML=gData.map(r=>'<tr><td>'+r.h.toFixed(2)+'</td><td>'+r.t.toFixed(3)+'</td><td>'+r.t2.toFixed(4)+'</td><td>'+r.g.toFixed(2)+'</td></tr>').join('');
 drawPracticalGraph('gGraph',gData.map(r=>({x:r.t2,y:r.h})),'t² / s²','h / m');
 if(gData.length){const mean=gData.reduce((a,b)=>a+b.g,0)/gData.length,fit=regression(gData.map(r=>({x:r.t2,y:r.h}))),graphG=fit?2*fit.m:null;$('#gSummary').textContent='Mean g = '+mean.toFixed(2)+' m s⁻²'+(graphG!==null?' | best-fit graph g = '+graphG.toFixed(2)+' m s⁻²':'')+'. Compare with 9.81 m s⁻² and evaluate scatter, intercept and uncertainty.';}else $('#gSummary').textContent='Collect at least three readings.';
}
$('#takeGReading').addEventListener('click',()=>{
 const h=Number($('#dropHeight').value)/100,ideal=Math.sqrt(2*h/9.81),noise=(Math.random()-.5)*.012,t=Math.max(.05,ideal+noise),g=2*h/(t*t);gData.push({h,t,t2:t*t,g});renderG();
 const ball=$('#dropBall');ball.style.transition='none';ball.style.top='30px';requestAnimationFrame(()=>{ball.style.transition='top '+Math.max(.25,ideal)+'s linear';ball.style.top='185px';});
});
$('#clearGData').addEventListener('click',()=>{gData=[];renderG();});

function renderY(){
 $('#yRows').innerHTML=yData.map(r=>'<tr><td>'+r.F.toFixed(1)+'</td><td>'+r.extmm.toFixed(3)+'</td><td>'+r.stress.toExponential(2)+'</td><td>'+r.strain.toExponential(2)+'</td><td>'+r.E.toExponential(2)+'</td></tr>').join('');
 drawPracticalGraph('yGraph',yData.map(r=>({x:r.strain,y:r.stress})),'strain','stress / Pa');
 if(yData.length){const mean=yData.reduce((a,b)=>a+b.E,0)/yData.length,fit=regression(yData.map(r=>({x:r.strain,y:r.stress}))),graphE=fit?fit.m:null;$('#ySummary').textContent='Mean E = '+mean.toExponential(3)+' Pa'+(graphE!==null?' | stress–strain gradient E = '+graphE.toExponential(3)+' Pa':'')+'. Check linearity, consistency and the effect of diameter uncertainty.';}else $('#ySummary').textContent='Collect at least three readings.';
}
$('#takeYReading').addEventListener('click',()=>{
 const m=Number($('#loadMass').value),d=Number($('#wireDiameter').value)*1e-3,L=1.5,F=m*9.81,A=Math.PI*d*d/4,trueE=2.0e11,ideal=F*L/(A*trueE),noise=1+(Math.random()-.5)*.04,ext=ideal*noise,stress=F/A,strain=ext/L,E=stress/strain;
 yData.push({F,extmm:ext*1000,stress,strain,E});renderY();$('#massBlock').style.top=(170+Math.min(18,ext*50000))+'px';
});
$('#clearYData').addEventListener('click',()=>{yData=[];renderY();});

renderCourseList();renderLesson();saveProgress();renderSim();renderFormula();renderQuiz();renderSpec();renderMasteryPanel();generateSkillQuestion();renderStructured();updatePracticalControls();renderG();renderY();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
})();