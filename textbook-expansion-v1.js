(() => {
'use strict';

const CHAPTERS = {
  'Scalars and vectors': {
    strap:'Build a secure foundation for every later mechanics calculation by learning how quantities carry magnitude, direction and sign.',
    diagram:'vectors',
    sections:[
      ['1. Scalars, vectors and physical meaning',`A <strong>scalar</strong> is completely described by a magnitude and unit. Examples include distance, speed, mass, time, energy, power and temperature. A <strong>vector</strong> requires both magnitude and direction. Examples include displacement, velocity, acceleration, force and momentum. This distinction matters because vectors cannot always be combined by ordinary arithmetic: direction changes the result.<br><br>A useful exam habit is to ask whether the quantity could sensibly be represented by an arrow. If direction changes the physical effect, the quantity is likely to be a vector. Distance and displacement are a classic pair: distance records total path length, whereas displacement is the straight-line change in position from start to finish, with direction.`],
      ['2. Representing and adding vectors',`Vectors are represented by arrows. The arrow direction gives the vector direction and the arrow length can represent magnitude when a scale is chosen. To add vectors graphically, place them <strong>head-to-tail</strong>; the resultant runs from the start of the first vector to the end of the final vector.<br><br>For perpendicular vectors, Pythagoras and trigonometry provide an exact method. If the components are x and y, the resultant magnitude is √(x²+y²) and the direction can be found with tan⁻¹(y/x). Always state the direction relative to a clearly named axis, for example “37° north of east”.`],
      ['3. Components and signs',`A vector can be described using signed components. Choosing east as positive x means a force west has a negative x-component. Choosing upward as positive y means weight has a negative y-component. The negative sign is not a negative magnitude; it records direction relative to the chosen coordinate system.<br><br>Signed components become especially powerful when several vectors act at once. Add all x-components to obtain the resultant x-component and separately add all y-components. Only after this should the components be recombined into a resultant magnitude and direction.`],
      ['4. Exam strategy',`Start with a quick sketch, choose positive directions, label known magnitudes and then decide whether a scale drawing or component calculation is more efficient. A calculated resultant of perpendicular vectors must be larger than either single component but smaller than their arithmetic sum. That estimate is a useful reasonableness check.<br><br>Common errors include giving only a magnitude, adding perpendicular magnitudes directly, using the wrong trigonometric ratio and forgetting that displacement or velocity must include direction.`]
    ],
    equations:['R = √(x² + y²)','θ = tan⁻¹(y/x)'],
    worked:'A force has components 12 N east and 5 N north. R = √(12²+5²) = 13 N. θ = tan⁻¹(5/12) = 22.6°, so the force is 13 N at 22.6° north of east.',
    exam:['State vector directions explicitly.','Use signed components consistently.','Check that your resultant magnitude is physically sensible.'],
    mistakes:['Adding perpendicular vectors as ordinary numbers.','Writing a vector answer without a direction.','Using tan⁻¹(x/y) when the angle is measured from the x-axis.']
  },

  'Resolving vectors and equilibrium': {
    strap:'Resolve forces into perpendicular directions and use component balance to decide whether a system is in equilibrium.',
    diagram:'resolution',
    sections:[
      ['1. Resolving a force',`Resolving means replacing one vector by perpendicular components that together have exactly the same effect. If a force F makes angle θ above the horizontal, the horizontal component is F cosθ and the vertical component is F sinθ. The choice reverses if the angle is measured from the vertical, so always inspect where the angle is drawn.<br><br>Components are not extra forces. They are a mathematical representation of the original force. A free-body diagram should normally show either the original force or its resolved components, not both as independent forces.`],
      ['2. Forces on slopes',`On an inclined plane it is usually most efficient to choose one axis parallel to the slope and one perpendicular to it. Weight mg is vertical, so it is resolved relative to these rotated axes. For slope angle θ, the component down the slope is mg sinθ and the component into the slope is mg cosθ.<br><br>If there is no acceleration perpendicular to the slope, the normal reaction balances the perpendicular component of weight, provided no other perpendicular forces act. Along the slope, the resultant component determines the acceleration.`],
      ['3. Translational equilibrium',`For translational equilibrium, the vector sum of all forces is zero. This means ΣFₓ = 0 and ΣFᵧ = 0 separately. An object in equilibrium may be stationary or moving at constant velocity; equilibrium does not necessarily mean “not moving”.<br><br>When three coplanar forces hold a point in equilibrium, they can form a closed triangle when drawn head-to-tail. In calculation questions, resolving each force into x and y components is usually more reliable than relying on a scale drawing.`],
      ['4. Solving equilibrium problems',`Draw every external force acting on the chosen object. Choose axes that simplify the geometry. Write one equation for each direction. If acceleration is zero, set the algebraic sum of components to zero. If an unknown tension or reaction appears, solve the simultaneous component equations.<br><br>A strong written explanation connects the mathematics to Newton’s first law: zero resultant force means zero acceleration, so velocity remains constant.`]
    ],
    equations:['Fₓ = F cosθ','Fᵧ = F sinθ','ΣFₓ = 0','ΣFᵧ = 0'],
    worked:'A 200 N force acts 30° above horizontal. Horizontal component = 200 cos30° = 173 N; vertical component = 200 sin30° = 100 N.',
    exam:['Choose axes before resolving.','Use the angle shown, not an assumed angle.','State equilibrium as zero resultant force, not zero individual forces.'],
    mistakes:['Using sin and cos the wrong way round.','Treating components as additional real forces.','Assuming normal reaction always equals mg.']
  },

  'Moments, couples and centre of mass': {
    strap:'Understand turning effects, balance, couples and stability using moments about a pivot.',
    diagram:'moments',
    sections:[
      ['1. The moment of a force',`A moment is the turning effect of a force about a point. Its magnitude is force multiplied by the <strong>perpendicular distance</strong> from the pivot to the line of action of the force. The distance is not automatically the distance from the pivot to the point where the force is applied.<br><br>The SI unit is N m. Although this has the same base units as joules, a moment is not energy, so it should not be written in joules.`],
      ['2. Principle of moments',`For rotational equilibrium, the net moment about any point is zero. In simple planar problems this is often written as total clockwise moment = total anticlockwise moment. Choosing the pivot cleverly can eliminate unknown reaction forces because any force whose line of action passes through the pivot has zero moment about that point.<br><br>Translational equilibrium must also hold for a fully static object, so the resultant force is zero as well as the resultant moment.`],
      ['3. Couples',`A couple consists of two equal, opposite, parallel forces whose lines of action are separated. Their resultant force is zero, but they produce a pure turning effect. The moment of a couple is one force multiplied by the perpendicular separation of the two lines of action.<br><br>The moment of a couple is independent of the point about which moments are calculated. This is why a steering wheel can be turned by applying opposite forces with two hands.`],
      ['4. Centre of mass and stability',`The centre of mass is the point through which the object’s weight may be treated as acting. A body remains stable while the vertical line through its centre of mass falls within the base of support. If that line passes outside the base, the weight produces a toppling moment.<br><br>Lowering the centre of mass or widening the base increases stability. This explains the design of many vehicles, laboratory stands and sporting stances.`]
    ],
    equations:['M = Fd⊥','ΣMclockwise = ΣManticlockwise','couple moment = F × separation'],
    worked:'A 40 N force acts with a perpendicular lever arm of 0.35 m. M = 40 × 0.35 = 14 N m.',
    exam:['Draw the line of action before identifying the lever arm.','Choose a pivot that removes unknown forces where possible.','Distinguish a couple from two balanced collinear forces.'],
    mistakes:['Using the sloping distance instead of perpendicular distance.','Using joules for moments.','Forgetting that static equilibrium requires both force and moment balance.']
  },

  'Motion quantities and graphs': {
    strap:'Read displacement, velocity and acceleration directly from graphs and connect gradients and areas to physical meaning.',
    diagram:'kinematics',
    sections:[
      ['1. Position, distance and displacement',`Distance is the total path length travelled and is a scalar. Displacement is the directed change in position. Average speed is total distance divided by time, while average velocity is displacement divided by time.<br><br>Instantaneous velocity describes the rate of change of displacement at one instant. On a displacement–time graph it is the gradient of the tangent. A steeper positive gradient means larger positive velocity; a horizontal section means zero velocity.`],
      ['2. Velocity–time graphs',`The gradient of a velocity–time graph is acceleration. A horizontal line therefore means constant velocity and zero acceleration. A straight sloping line means constant acceleration. Curvature means acceleration is changing.<br><br>The signed area under a velocity–time graph gives displacement. Area below the time axis contributes negative displacement. If a question asks for total distance, use the magnitudes of positive and negative areas rather than allowing them to cancel.`],
      ['3. Acceleration–time graphs',`Acceleration is the rate of change of velocity. The signed area under an acceleration–time graph gives change in velocity, Δv. Positive acceleration does not automatically mean an object is speeding up: if velocity is negative, positive acceleration can reduce the magnitude of velocity and therefore slow the object down.<br><br>Always interpret signs relative to the chosen positive direction rather than attaching words such as “forward” or “slowing” without checking the velocity sign.`],
      ['4. Graph interpretation in exams',`Label axes and units before interpreting a graph. Ask three separate questions: what does the vertical value mean, what does the gradient mean and what does the area mean? Do not assume every area or gradient has a useful physical meaning; it depends on the graph variables.<br><br>When estimating an instantaneous gradient from a curve, draw a large tangent triangle to reduce percentage reading uncertainty.`]
    ],
    equations:['v = Δs/Δt','a = Δv/Δt','area under v–t = displacement','area under a–t = Δv'],
    worked:'Velocity rises uniformly from 4.0 to 16.0 m s⁻¹ in 6.0 s. a = (16−4)/6 = 2.0 m s⁻². Displacement = trapezium area = ½(4+16)×6 = 60 m.',
    exam:['Treat area as signed unless distance is requested.','Use tangents for instantaneous gradients on curves.','Explain negative values using direction, not “negative speed”.'],
    mistakes:['Calling the area under a displacement–time graph “distance”.','Assuming positive acceleration always means speeding up.','Ignoring sections below the time axis.']
  },

  'SUVAT and free fall': {
    strap:'Choose the correct constant-acceleration equation, control signs and model vertical motion under gravity.',
    diagram:'suvat',
    sections:[
      ['1. When SUVAT works',`SUVAT equations describe one-dimensional motion with constant acceleration. The symbols are s for displacement, u for initial velocity, v for final velocity, a for acceleration and t for time. The equations are not valid if acceleration changes significantly during the interval.<br><br>Before choosing an equation, write down the known quantities and the required quantity. Select the equation that contains the required quantity and only the known quantities. This is more reliable than memorising a preferred formula and trying to force every problem into it.`],
      ['2. The four core equations',`The relationships v=u+at, s=ut+½at², v²=u²+2as and s=½(u+v)t are equivalent descriptions of constant-acceleration motion. Each omits one of the five SUVAT variables, which is why listing knowns first is so effective.<br><br>Units should be SI unless the question states otherwise: displacement in m, velocities in m s⁻¹, acceleration in m s⁻² and time in s.`],
      ['3. Sign conventions',`Choose a positive direction and keep it for the entire calculation. If upward is positive, gravitational acceleration is a = −9.81 m s⁻². If downward is positive, a = +9.81 m s⁻². Initial or final velocities may be negative if they point opposite to the chosen positive direction.<br><br>A negative calculated displacement or velocity is not automatically an error; it may simply mean the true direction is opposite to the positive direction you defined.`],
      ['4. Free fall and vertical throws',`Near Earth, objects in ideal free fall accelerate downward at approximately 9.81 m s⁻² regardless of mass, provided air resistance is negligible. At the highest point of an upward throw, vertical velocity is instantaneously zero, but acceleration remains downward at g.<br><br>For a drop from rest, u=0. For a vertical launch, the journey up and down can often be analysed using one consistent sign convention. Do not switch the sign of g halfway through the motion.`]
    ],
    equations:['v = u + at','s = ut + ½at²','v² = u² + 2as','s = ½(u+v)t'],
    worked:'A ball is thrown upward at 14.0 m s⁻¹. At maximum height v=0 and a=−9.81 m s⁻². Using v²=u²+2as: 0=196−19.62s, so s=9.99 m.',
    exam:['Write a sign convention before substituting.','Check acceleration is genuinely constant.','At maximum height use v=0, not a=0.'],
    mistakes:['Changing the sign of g during one calculation.','Using speed where signed velocity is needed.','Applying SUVAT when drag makes acceleration variable.']
  },

  'Required Practical 3: determining g': {
    strap:'Understand the apparatus, graph method, uncertainty and evaluation needed to determine gravitational acceleration experimentally.',
    diagram:'rp3',
    sections:[
      ['1. Experimental idea',`A simple method measures a vertical drop distance h and the corresponding fall time t for an object released from rest. Electronic timing using light gates, an electromagnet or an electronic release can greatly reduce human reaction-time error.<br><br>The object should fall freely through a measured distance. Distances must be measured between consistent reference points, for example from the bottom of the ball at release to the light-gate reference line.`],
      ['2. Linearising the relationship',`For release from rest and negligible air resistance, h=½gt². This predicts that h is directly proportional to t². Plotting h on the y-axis against t² on the x-axis should therefore produce a straight line with gradient g/2.<br><br>After drawing a best-fit line, calculate its gradient using two widely separated points on the line, not necessarily raw data points. Then g = 2 × gradient.`],
      ['3. Reliability and uncertainty',`Use a wide range of drop heights so that the graph spans a large range. Repeat timings at each height and calculate a mean if appropriate. Longer fall times generally reduce percentage timing uncertainty because the absolute timing uncertainty is a smaller fraction of the measured value.<br><br>Random uncertainty produces scatter around the best-fit line. Repeating measurements can reduce the effect of random variation, but it does not remove a systematic offset.`],
      ['4. Evaluation',`Possible limitations include timing delay, uncertainty in the release point, measuring the wrong distance reference and air resistance. A good evaluation links each problem to its likely effect and proposes a specific improvement. For example, replacing a handheld stopwatch with light gates targets reaction-time uncertainty directly.<br><br>If the graph has a non-zero intercept, discuss possible systematic offsets instead of simply forcing the best-fit line through the origin.`]
    ],
    equations:['h = ½gt²','gradient(h vs t²) = g/2','g = 2 × gradient'],
    worked:'If the gradient of h against t² is 4.88 m s⁻², then g = 2×4.88 = 9.76 m s⁻².',
    exam:['Name the graph axes explicitly.','Use a large gradient triangle.','Distinguish random uncertainty from systematic error.'],
    mistakes:['Plotting h against t rather than t².','Using one reading only.','Saying repeats remove systematic error.']
  },

  'Projectile motion, drag and terminal speed': {
    strap:'Split two-dimensional motion into horizontal and vertical components, then extend the model to resistive forces and terminal speed.',
    diagram:'projectiles',
    sections:[
      ['1. Independent components',`In the ideal projectile model, horizontal and vertical motion are analysed separately but share the same time. Gravity acts vertically, so horizontal acceleration is zero when air resistance is neglected. Horizontal velocity therefore remains constant while vertical velocity changes uniformly.<br><br>For an angled launch, resolve initial velocity u into uₓ=u cosθ and uᵧ=u sinθ. Then use x=uₓt horizontally and the appropriate SUVAT equation vertically.`],
      ['2. Launching from a height',`When the launch point is above the landing level, the vertical displacement to the ground is not zero. If upward is positive and launch height is h, the ground is at sᵧ=−h. This usually leads to a quadratic in time.<br><br>Once the physically meaningful positive flight time is found, horizontal range follows from x=uₓt. The same method works for a horizontal launch by setting uᵧ=0.`],
      ['3. Maximum height and impact velocity',`At maximum height, vertical velocity vᵧ=0 but horizontal velocity remains uₓ in the no-drag model. Use vertical SUVAT to find time to the apex or vertical rise. At any time, combine vₓ and vᵧ with Pythagoras to obtain resultant speed and use trigonometry for direction.<br><br>For a projectile returning to the same height with no drag, the vertical component at return has the same magnitude and opposite sign to its initial vertical component.`],
      ['4. Drag and terminal speed',`Air resistance acts opposite to the direction of motion and generally increases with speed. It reduces horizontal speed, lowers the maximum height and usually reduces range. The real trajectory is therefore not perfectly symmetric.<br><br>For a falling body, weight is initially larger than drag, so the object accelerates. As speed rises, drag increases. Terminal speed occurs when drag equals weight, giving zero resultant force and zero acceleration. The object then continues at constant velocity.`],
      ['5. Lift and model assumptions',`Drag acts approximately parallel and opposite to relative airflow. Lift acts approximately perpendicular to the airflow. When using an ideal projectile model, state assumptions if they matter: uniform g, negligible air resistance, a point-like projectile and a locally flat reference frame are common simplifications.<br><br>Use the simulator to compare the ideal trajectory with drag switched on and explain each visible difference using forces and acceleration.`]
    ],
    equations:['uₓ = u cosθ','uᵧ = u sinθ','x = uₓt','sᵧ = uᵧt − ½gt²','vᵧ = uᵧ − gt','v = √(vₓ²+vᵧ²)'],
    worked:'A ball leaves a 1.25 m high table horizontally at 6.0 m s⁻¹. Vertically, 1.25=½gt² gives t=0.505 s. Range = 6.0×0.505 = 3.03 m.',
    exam:['Use one common time for both components.','Set vertical displacement correctly when launch and landing heights differ.','At the apex use vᵧ=0, not total v=0.'],
    mistakes:['Using total launch speed in the horizontal equation after an angled launch.','Assuming range formulae for equal launch/landing height when heights differ.','Saying terminal speed means no forces act.']
  },

  'Newton’s laws and free-body diagrams': {
    strap:'Connect forces to changes in motion using all three Newton laws and clear free-body diagrams.',
    diagram:'newton',
    sections:[
      ['1. Newton’s first law',`If the resultant external force on an object is zero, its velocity remains constant. Constant velocity includes remaining at rest. The first law is therefore a statement about inertia and establishes the link between zero resultant force and zero acceleration.<br><br>Balanced forces do not mean “no forces”; several forces may act and cancel vectorially.`],
      ['2. Newton’s second law',`For constant mass, ΣF=ma. The force in this equation is the <strong>resultant</strong> force. Choose a positive direction, resolve forces if necessary, add them algebraically and then divide by mass to obtain acceleration.<br><br>For motion on a slope or in a lift, writing one equation along the acceleration direction often makes the problem much clearer.`],
      ['3. Free-body diagrams',`A free-body diagram contains only the forces acting on the chosen object. Common forces include weight, normal contact force, tension, friction, drag, lift and applied forces. Arrows should show direction clearly and labels should identify the force type.<br><br>Do not include forces that the object exerts on something else. Those belong on the free-body diagram of the other object.`],
      ['4. Newton’s third law',`If object A exerts a force on object B, B simultaneously exerts an equal-magnitude, opposite-direction force of the same interaction type on A. A third-law pair always acts on two different objects.<br><br>This is why the weight and normal reaction on a book are not a third-law pair: both act on the book. The third-law partner to the Earth’s gravitational force on the book is the book’s gravitational force on the Earth.`],
      ['5. Connected systems',`For connected masses, you can apply ΣF=ma to each body separately or to the whole system. Internal tensions cancel when the entire system is treated as one object, which can simplify the first stage of a calculation. Then return to one component if the tension itself is required.`]
    ],
    equations:['ΣF = ma','W = mg'],
    worked:'A 10 kg lift accelerates upward at 1.5 m s⁻². Taking up as positive: T−mg=ma, so T=10(9.81+1.5)=113 N.',
    exam:['Draw the free-body diagram before writing equations.','Use resultant force, not a single force.','Third-law pairs must act on different objects.'],
    mistakes:['Pairing weight and normal reaction as a third-law pair.','Adding magnitudes without signs.','Including “motion” or “acceleration” as forces.']
  },

  'Momentum, impulse and collisions': {
    strap:'Use momentum conservation and impulse to analyse collisions, explosions and force–time interactions.',
    diagram:'momentum',
    sections:[
      ['1. Momentum as a vector',`Momentum is p=mv and has direction because velocity is a vector. The SI unit is kg m s⁻¹. Choose a positive direction before a collision calculation, then assign positive or negative velocities consistently.<br><br>A large mass moving slowly can have the same momentum as a small mass moving quickly. Momentum describes motion but is not the same quantity as kinetic energy.`],
      ['2. Conservation of momentum',`Total momentum remains constant for a closed system when the net external impulse is negligible. For a one-dimensional interaction, add signed momenta before the collision and set them equal to the signed total after the collision.<br><br>Momentum conservation applies to elastic and inelastic collisions. What differs is whether kinetic energy is also conserved.`],
      ['3. Impulse',`Impulse equals change in momentum: J=Δp. For a constant force, J=FΔt. More generally, impulse is the area under a force–time graph. Increasing the time over which a given momentum change occurs reduces the average force.<br><br>This explains the function of crumple zones, airbags and padding: they do not remove the required momentum change, but they increase the time over which it occurs.`],
      ['4. Elastic and inelastic collisions',`In an elastic collision, total kinetic energy as well as momentum is conserved. In an inelastic collision, momentum is still conserved for the isolated system but some kinetic energy is transferred to internal energy, deformation or sound. If objects stick together, the collision is perfectly inelastic.<br><br>Never use kinetic-energy conservation automatically simply because momentum is conserved.`],
      ['5. Force–time graphs',`The area under a force–time graph gives impulse, even if the force varies. For a triangular pulse the impulse is ½×base×height. If the direction of force reverses, areas can have opposite signs and must be treated algebraically when finding net impulse.`]
    ],
    equations:['p = mv','Σp before = Σp after','J = Δp','J = FΔt','impulse = area under F–t'],
    worked:'A 0.40 kg trolley at 5.0 m s⁻¹ sticks to a stationary 0.60 kg trolley. Initial p=2.0 kg m s⁻¹. Total mass=1.00 kg, so final v=2.0 m s⁻¹.',
    exam:['Choose a positive direction and keep signs.','State the closed-system condition.','Do not assume kinetic energy is conserved unless justified.'],
    mistakes:['Using speeds without directions.','Conserving kinetic energy in every collision.','Calling force itself “impulse”.']
  },

  'Work, energy, power and efficiency': {
    strap:'Calculate mechanical energy transfers, connect force–displacement graphs to work and distinguish energy from power.',
    diagram:'work',
    sections:[
      ['1. Work and energy transfer',`Work done is energy transferred by a force through a displacement. For a constant force at angle θ to the displacement, W=Fs cosθ. Only the component of force parallel to the displacement transfers energy by this mechanical work route.<br><br>If force is perpendicular to displacement, cos90°=0 and no work is done by that force, even though it may change the direction of motion.`],
      ['2. Kinetic and gravitational energy',`Kinetic energy is Eₖ=½mv², so doubling speed quadruples kinetic energy. Gravitational potential energy change near Earth is ΔEₚ=mgΔh. The sign of Δh determines whether the gravitational store increases or decreases.<br><br>Energy methods are often efficient when a problem asks only about initial and final states and the detailed time history is not required.`],
      ['3. Force–displacement graphs',`The area under a force–displacement graph is work done, provided the plotted force component is along the displacement. For a changing force, split the graph into simple shapes or integrate if appropriate. The result is an energy transfer in joules.<br><br>For an ideal spring in its linear region, the triangular area under the F–x graph gives elastic strain energy ½Fx.`],
      ['4. Power',`Power is the rate of energy transfer: P=W/t. For a force acting in the direction of constant velocity, P=Fv. This relation is useful for vehicles moving steadily against resistive forces because the driving force equals the total resistance at constant speed.<br><br>Power and energy must not be confused: watts describe joules transferred per second.`],
      ['5. Efficiency',`Efficiency compares useful output with total input. It may be written as a decimal or percentage. Energy is not destroyed in an inefficient device; some input energy is transferred to less useful stores such as internal energy of the surroundings.<br><br>Always compare like with like: useful energy/total energy or useful power/total power.`]
    ],
    equations:['W = Fs cosθ','Eₖ = ½mv²','ΔEₚ = mgΔh','P = W/t','P = Fv','efficiency = useful/total'],
    worked:'A car moves at constant 20 m s⁻¹ against 700 N resistance. Engine force is 700 N, so P=Fv=700×20=14 000 W = 14 kW.',
    exam:['Check whether force is parallel to displacement.','Use energy or power ratios consistently for efficiency.','Remember kinetic energy depends on v².'],
    mistakes:['Using W=Fs when the force is angled.','Confusing watts with joules.','Saying dissipated energy is destroyed.']
  },

  'Conservation of energy': {
    strap:'Track energy stores through a system and account quantitatively for dissipative transfers.',
    diagram:'energy',
    sections:[
      ['1. Conservation principle',`Energy cannot be created or destroyed; it is transferred between stores and between the system and surroundings. In a closed system the total energy remains constant. Mechanical energy refers to kinetic plus relevant potential energy stores, not to every possible energy store.<br><br>When resistive forces act, mechanical energy can decrease because energy is transferred to internal energy of the object and surroundings, while total energy remains conserved.`],
      ['2. Ideal mechanical systems',`If resistive transfers are negligible, ½mv²+mgh may remain constant between two points. This is often a faster route than using forces and SUVAT because time does not appear.<br><br>Choose a convenient zero for gravitational potential energy; only changes in gravitational potential energy matter.`],
      ['3. Dissipation and work against resistance',`Work done against friction or drag transfers mechanical energy to internal energy. A useful balance is initial mechanical energy = final mechanical energy + energy dissipated. If a roughly constant resistive force acts through distance s, dissipated energy may be estimated using W=Fs.<br><br>In multi-stage questions, identify the system boundary so that you know whether a transfer is internal to the system or crosses the boundary.`],
      ['4. Choosing an energy method',`Use energy conservation when initial and final speeds/heights are known and the route or time is not important. Use Newton’s laws when forces and acceleration are central, and momentum when a short interaction such as a collision dominates. Strong problem solving often combines these methods in stages.<br><br>Always identify where “missing” mechanical energy has gone rather than claiming energy has been lost from existence.`]
    ],
    equations:['Einitial = Efinal + dissipated','½mv² + mgh = constant (ideal)','Wdissipated = Fs'],
    worked:'A 2.0 kg object falls 3.0 m and loses 8.0 J to drag. GPE decrease = 2×9.81×3 = 58.9 J, so KE gained = 50.9 J. v = √(2Eₖ/m) = 7.13 m s⁻¹.',
    exam:['Define the system before writing an energy balance.','Account for dissipated transfers explicitly.','Do not write “energy is lost”; state where it is transferred.'],
    mistakes:['Conserving mechanical energy when friction is significant without including dissipation.','Using mass instead of weight in mgh incorrectly.','Mixing momentum and energy conservation conditions.']
  },

  'Density, Hooke’s law and elastic limit': {
    strap:'Move from rigid-body mechanics into material behaviour using density, extension and spring stiffness.',
    diagram:'hooke',
    sections:[
      ['1. Density',`Density is mass per unit volume, ρ=m/V. It is a material property for a uniform material under specified conditions. Use SI units: kg for mass and m³ for volume, giving kg m⁻³.<br><br>Geometry often matters because the volume of a wire, cylinder or block must be found before density can be calculated.`],
      ['2. Extension and deformation',`Extension ΔL is the increase in length relative to the original length. It is not the same as final length. When a tensile force is applied to a spring or wire, extension usually increases with force over an initial region.<br><br>Elastic deformation is reversible when the load is removed. Plastic deformation leaves a permanent change.`],
      ['3. Hooke’s law',`In the linear Hookean region, extension is proportional to applied force: F=kΔL. The spring constant k measures stiffness of that particular spring or sample arrangement and has unit N m⁻¹.<br><br>On a graph of force against extension, the gradient in the straight-line region is k. If extension is plotted against force instead, the gradient is 1/k, so inspect axes carefully.`],
      ['4. Limit of proportionality and elastic limit',`The limit of proportionality marks the end of direct proportionality between force and extension. The elastic limit is the greatest deformation from which the object can return to its original shape when unloaded. These points are related but not identical ideas.<br><br>A material can behave elastically over a region that is no longer perfectly linear, so “elastic” does not automatically mean “Hookean”.`],
      ['5. Elastic strain energy',`Energy transferred into an elastic sample equals the area under the force–extension graph. In the linear region this area is triangular, giving E=½FΔL=½k(ΔL)². Beyond the linear region, use the actual graph area rather than the triangular formula.`]
    ],
    equations:['ρ = m/V','F = kΔL','Eelastic = ½FΔL','Eelastic = ½k(ΔL)²'],
    worked:'A spring extends 0.040 m under 12 N. k=F/ΔL=12/0.040=300 N m⁻¹. Stored energy = ½×12×0.040 = 0.24 J.',
    exam:['Check which variable is on each graph axis.','Convert mm extension to m before using SI equations.','Separate “limit of proportionality” from “elastic limit”.'],
    mistakes:['Using final length instead of extension.','Calling every elastic region Hookean.','Using ½FΔL outside the linear region without checking the graph.']
  },

  'Stress, strain and elastic strain energy': {
    strap:'Normalise force and extension for sample geometry so different materials and specimens can be compared fairly.',
    diagram:'stress',
    sections:[
      ['1. Tensile stress',`Tensile stress is force per cross-sectional area: σ=F/A. Its unit is Pa, equivalent to N m⁻². Stress describes how concentrated the applied force is. The same force creates greater stress in a thinner wire because the force is distributed over a smaller area.<br><br>Area must be in m². For a circular wire, calculate A=πd²/4 after converting diameter to metres.`],
      ['2. Tensile strain',`Tensile strain is extension divided by original length: ε=ΔL/L. It has no unit because it is a ratio of two lengths measured in the same unit. Strain describes fractional deformation rather than absolute extension.<br><br>Two wires can extend by the same amount but have different strains if their original lengths differ.`],
      ['3. Force–extension versus stress–strain',`A force–extension graph describes a particular specimen, so its gradient depends on both material and dimensions. A stress–strain graph removes the simple geometry dependence and is therefore much more useful for comparing materials.<br><br>The initial gradient of stress against strain is the Young modulus for the linear elastic region.`],
      ['4. Elastic strain energy',`The area under a force–extension graph gives total elastic energy transferred to a specimen. In the linear region E=½FΔL. On a stress–strain graph, area has units of J m⁻³ and represents elastic energy transferred per unit volume.<br><br>This connection helps explain why materials with different stress–strain curves can store different amounts of energy before permanent deformation or fracture.`]
    ],
    equations:['stress = F/A','strain = ΔL/L','Eelastic = ½FΔL'],
    worked:'A 2.0 m wire extends 1.2 mm. Strain = 1.2×10⁻³ / 2.0 = 6.0×10⁻⁴.',
    exam:['Convert area to m².','State that strain is dimensionless.','Use original length, not final length, in strain.'],
    mistakes:['Giving strain units.','Using diameter directly as area.','Confusing stress with force or strain with extension.']
  },

  'Stress–strain curves and material behaviour': {
    strap:'Interpret complete stress–strain curves to distinguish elastic, plastic, brittle and ductile behaviour.',
    diagram:'materials',
    sections:[
      ['1. Linear elastic region',`At small strain many materials show an approximately straight-line stress–strain relationship. In this region stress is proportional to strain and unloading returns the specimen close to its original dimensions. The gradient is the Young modulus.<br><br>The end of proportional behaviour does not necessarily mean immediate fracture.`],
      ['2. Yielding and plastic deformation',`When a ductile material is loaded beyond its elastic range, plastic deformation can occur. After unloading, a permanent strain remains. Metals may show a yield region where substantial strain occurs with relatively small additional stress.<br><br>Plastic behaviour is useful in forming materials but undesirable when a structure is intended to return to its original shape.`],
      ['3. Ductile and brittle behaviour',`A ductile material experiences significant plastic deformation before fracture. A brittle material fractures after relatively little plastic deformation. These terms describe deformation behaviour; they do not directly tell you the Young modulus or breaking stress.<br><br>A material can be stiff but brittle, or less stiff yet tough and ductile. Avoid using “strong”, “stiff” and “tough” as interchangeable words.`],
      ['4. Breaking stress and graph interpretation',`Breaking stress is the stress at fracture, not the breaking force. Using stress rather than force allows comparison between specimens of different cross-sectional areas. The area under the stress–strain curve relates to energy absorbed per unit volume before fracture and gives useful qualitative information about toughness.<br><br>When comparing curves, describe precise features: initial gradient, yield behaviour, maximum stress, plastic strain and fracture point.`]
    ],
    equations:['breaking stress = Fbreak/A','Young modulus = initial stress–strain gradient'],
    worked:'Two wires break at the same force, but wire A has half the area of B. Wire A experiences twice the breaking stress, so breaking force alone is not a fair material comparison.',
    exam:['Use graph features rather than vague labels.','Distinguish stiffness from strength.','Explain plastic deformation as permanent deformation after unloading.'],
    mistakes:['Calling the steepest curve “strongest” without checking breaking stress.','Equating brittle with weak.','Using breaking force to compare different specimen sizes.']
  },

  'Young modulus': {
    strap:'Quantify material stiffness using stress divided by strain and connect microscopic material behaviour to measurable extension.',
    diagram:'young',
    sections:[
      ['1. Definition',`Young modulus E is tensile stress divided by tensile strain in the linear elastic region. Because strain is dimensionless, Young modulus has the same unit as stress: pascals. A large Young modulus means a material develops a large stress for a small strain and is therefore stiff.<br><br>Stiffness is not the same as strength. Strength concerns the stress a material can withstand before failure or significant permanent deformation.`],
      ['2. Stress–strain gradient',`On a graph with stress on the vertical axis and strain on the horizontal axis, the gradient of the initial straight-line region is Young modulus. Use a large triangle across the linear section to calculate the gradient accurately.<br><br>If the graph axes are reversed, the gradient is 1/E, so inspect the axis labels before calculating.`],
      ['3. Sample dimensions and extension',`Combining stress=F/A and strain=ΔL/L gives E=FL/(AΔL). This relationship explains how sample geometry affects extension: a longer wire extends more, a larger cross-sectional area extends less and a larger Young modulus reduces extension for the same load.<br><br>The equation is valid while the material is behaving linearly and elastically.`],
      ['4. Comparing materials',`Young modulus is useful because it is primarily a material property rather than a property of one particular specimen shape. Two samples of the same material can have different spring constants because their dimensions differ, while their Young moduli should be similar under the same physical conditions.<br><br>Use this distinction in explanations: spring constant describes the specimen; Young modulus describes material stiffness.`]
    ],
    equations:['E = stress/strain','E = FL/(AΔL)','stress = F/A','strain = ΔL/L'],
    worked:'A wire has F=40 N, L=2.0 m, A=2.0×10⁻⁷ m² and ΔL=2.0 mm. E=FL/(AΔL)=40×2/(2.0×10⁻⁷×2.0×10⁻³)=2.0×10¹¹ Pa.',
    exam:['Use the linear elastic region only.','Convert extension and area into SI units.','State that large E means high stiffness, not necessarily high breaking stress.'],
    mistakes:['Using total length instead of extension in the denominator.','Confusing Young modulus with spring constant.','Using a plastic-region gradient.']
  },

  'Required Practical 4: Young modulus': {
    strap:'Measure Young modulus from force, length, extension and wire diameter while controlling uncertainty and safety.',
    diagram:'rp4',
    sections:[
      ['1. Apparatus and method',`A long wire is clamped securely and loaded in tension. Measure the original gauge length L, the applied force F and the extension ΔL. Extension can be measured using a marker and scale, vernier arrangement or travelling microscope depending on the apparatus available.<br><br>Add loads gradually and avoid exceeding the elastic region if the aim is to determine Young modulus from linear elastic behaviour.`],
      ['2. Measuring cross-sectional area',`Measure wire diameter d with a micrometer at several positions and in more than one orientation because the wire may not be perfectly uniform or circular. Calculate a mean diameter, convert it to metres and use A=πd²/4.<br><br>Diameter is especially important because area depends on d², so percentage uncertainty in diameter contributes approximately twice that percentage uncertainty to area.`],
      ['3. Graph method',`For each load calculate stress F/A and strain ΔL/L, then plot stress on the y-axis against strain on the x-axis. The gradient of the initial straight-line region is Young modulus. A graph uses multiple measurements and is generally more robust than calculating E from a single pair.<br><br>Alternatively, a force–extension graph can be used with sample dimensions to obtain E from its gradient.`],
      ['4. Uncertainty and improvements',`Use a long wire so that extensions are larger and percentage extension uncertainty is reduced. Read scales at eye level, remove backlash where relevant, repeat diameter measurements and use a wide load range within the elastic region.<br><br>Account for any initial slack or zero offset. If unloading data are collected, compare loading and unloading behaviour to check for permanent deformation.`],
      ['5. Safety',`Secure masses and supports, keep feet clear of falling loads, use eye protection where appropriate and avoid standing in line with a highly tensioned wire. The practical should be carried out using the school’s approved risk assessment and apparatus limits.`]
    ],
    equations:['A = πd²/4','stress = F/A','strain = ΔL/L','E = stress/strain','E = FL/(AΔL)'],
    worked:'If d=0.50 mm, A=π(5.0×10⁻⁴)²/4 = 1.96×10⁻⁷ m². Use this area in each stress calculation before finding the stress–strain gradient.',
    exam:['Explain why diameter is repeated.','Link every uncertainty improvement to the measurement it improves.','Use stress against strain with correct axes.'],
    mistakes:['Measuring diameter once.','Forgetting the d² dependence of area uncertainty.','Using data beyond the linear elastic region for E.']
  },

  'Mechanics mastery and synoptic problems': {
    strap:'Combine forces, motion, momentum, energy and materials ideas in longer multi-stage AQA-style problems.',
    diagram:'mastery',
    sections:[
      ['1. Build the physical model first',`Before selecting equations, define the system, draw a labelled diagram, choose positive directions and list known quantities. Then identify the physical principle governing each stage. Strong mechanics solutions are built from models, not from searching for an equation that happens to contain the desired symbol.<br><br>State assumptions such as negligible drag, constant acceleration, negligible external impulse or linear elasticity when they determine whether an equation is valid.`],
      ['2. Choose the governing principle',`Use Newton’s laws when resultant forces and acceleration are central. Use SUVAT for constant-acceleration motion. Use energy when initial and final states matter more than the path or time. Use momentum for short interactions where external impulse is negligible. Use moments for rotational equilibrium and materials equations for deformation.<br><br>A synoptic question may require different principles in sequence.`],
      ['3. Multi-stage problems',`Treat each stage separately and carry physically meaningful results into the next stage. For example, use energy to find speed at the bottom of a ramp, then momentum for a collision, then energy again to find a later rise height. Keep unrounded calculator values between stages and round only the final answer.<br><br>Annotate your working with short statements such as “momentum conserved during collision” or “mechanical energy decreases due to work against resistance”.`],
      ['4. Graphs, units and checks',`Use gradients and areas only after identifying the graph variables. Check units at every major step. Test limiting cases: if resistance were zero, should the answer increase or decrease? If mass doubled, what trend would you expect? These checks reveal many algebraic errors.<br><br>Final answers should include appropriate units, sensible significant figures and a direction where the quantity is vectorial.`],
      ['5. Writing high-mark explanations',`Extended explanations should link cause to mechanism to consequence. Instead of “drag increases so acceleration decreases”, write: speed rises → drag rises → resultant downward force becomes smaller → acceleration decreases; at terminal speed drag equals weight and resultant force becomes zero.<br><br>Use precise terms such as resultant force, energy transfer, closed system, perpendicular distance and linear elastic region.`]
    ],
    equations:['ΣF = ma','v = u + at','p = mv','Σp before = Σp after','Eₖ = ½mv²','W = Fs','M = Fd⊥','E = stress/strain'],
    worked:'A trolley descends a ramp then sticks to a stationary trolley. Stage 1: use an energy balance to find speed before collision. Stage 2: use momentum conservation through the short collision. Do not conserve kinetic energy if they stick.',
    exam:['Name the principle used at each stage.','Keep signs and units consistent across stages.','State assumptions that make each model valid.'],
    mistakes:['Using one equation set for every stage.','Rounding intermediate values too early.','Conserving mechanical energy or kinetic energy when dissipative processes are present.']
  }
};

function svgWrap(inner,caption){
  return `<figure class="tbx-diagram"><svg viewBox="0 0 720 300" role="img" aria-label="${caption}"><defs><marker id="tbxArrow" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="currentColor"></polygon></marker></defs>${inner}</svg><figcaption>${caption}</figcaption></figure>`;
}
function axis(x1,y1,x2,y2,label){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="tbx-axis" marker-end="url(#tbxArrow)"/><text x="${x2-10}" y="${y2-10}" class="tbx-label">${label}</text>`;}
function diagram(kind){
  const blue='tbx-blue', gold='tbx-gold', green='tbx-green', red='tbx-red';
  if(kind==='vectors') return svgWrap(`${axis(90,230,610,230,'x')}${axis(90,230,90,55,'y')}<line x1="150" y1="220" x2="430" y2="220" class="${blue}" marker-end="url(#tbxArrow)"/><line x1="430" y1="220" x2="430" y2="95" class="${green}" marker-end="url(#tbxArrow)"/><line x1="150" y1="220" x2="430" y2="95" class="${gold}" marker-end="url(#tbxArrow)"/><text x="270" y="210" class="tbx-label">x component</text><text x="445" y="160" class="tbx-label">y component</text><text x="260" y="135" class="tbx-label">resultant</text>`,'Perpendicular vector components and resultant');
  if(kind==='resolution') return svgWrap(`<line x1="100" y1="235" x2="600" y2="95" class="tbx-axis"/><rect x="340" y="130" width="85" height="55" rx="8" class="tbx-box" transform="rotate(-15 382 158)"/><line x1="382" y1="160" x2="382" y2="265" class="${red}" marker-end="url(#tbxArrow)"/><line x1="382" y1="160" x2="305" y2="181" class="${gold}" marker-end="url(#tbxArrow)"/><line x1="382" y1="160" x2="356" y2="64" class="${green}" marker-end="url(#tbxArrow)"/><text x="392" y="245" class="tbx-label">mg</text><text x="225" y="198" class="tbx-label">mg sinθ</text><text x="330" y="52" class="tbx-label">reaction</text>`,'Resolving weight on an inclined plane');
  if(kind==='moments') return svgWrap(`<line x1="100" y1="160" x2="620" y2="160" class="tbx-beam"/><polygon points="340,160 310,220 370,220" class="tbx-pivot"/><line x1="180" y1="70" x2="180" y2="150" class="${red}" marker-end="url(#tbxArrow)"/><line x1="535" y1="65" x2="535" y2="150" class="${blue}" marker-end="url(#tbxArrow)"/><line x1="180" y1="245" x2="340" y2="245" class="tbx-dim"/><line x1="340" y1="245" x2="535" y2="245" class="tbx-dim"/><text x="220" y="270" class="tbx-label">d₁</text><text x="430" y="270" class="tbx-label">d₂</text><text x="150" y="55" class="tbx-label">F₁</text><text x="515" y="50" class="tbx-label">F₂</text>`,'Moments about a pivot use perpendicular distance');
  if(kind==='kinematics') return svgWrap(`${axis(80,245,650,245,'t')}${axis(80,245,80,40,'v')}<polyline points="90,230 240,115 420,115 590,220" class="${blue}"/><polygon points="90,230 240,115 420,115 590,220 590,245 90,245" class="tbx-area"/><text x="175" y="95" class="tbx-label">gradient = acceleration</text><text x="290" y="205" class="tbx-label">area = displacement</text>`,'Velocity–time graph: gradient and area have physical meaning');
  if(kind==='suvat') return svgWrap(`<circle cx="235" cy="65" r="13" class="tbx-ball"/><circle cx="235" cy="135" r="13" class="tbx-ball ghost"/><circle cx="235" cy="225" r="13" class="tbx-ball ghost2"/><line x1="235" y1="70" x2="235" y2="250" class="${red}" marker-end="url(#tbxArrow)"/><text x="260" y="160" class="tbx-label">a = g downward</text><line x1="390" y1="220" x2="600" y2="90" class="${gold}" marker-end="url(#tbxArrow)"/><text x="430" y="238" class="tbx-label">choose a positive direction</text>`,'Constant acceleration and sign convention in vertical motion');
  if(kind==='rp3') return svgWrap(`<rect x="160" y="55" width="85" height="30" rx="5" class="tbx-device"/><circle cx="202" cy="110" r="14" class="tbx-ball"/><line x1="202" y1="125" x2="202" y2="225" class="tbx-dim"/><rect x="130" y="225" width="145" height="16" class="tbx-gate"/><text x="285" y="82" class="tbx-label">electromagnet / release</text><text x="285" y="235" class="tbx-label">light gate</text><text x="215" y="180" class="tbx-label">h</text><line x1="390" y1="230" x2="650" y2="230" class="tbx-axis"/><line x1="420" y1="210" x2="620" y2="60" class="${blue}"/><text x="480" y="50" class="tbx-label">h against t²</text>`,'Required Practical 3: free-fall timing and linear graph');
  if(kind==='projectiles') return svgWrap(`${axis(70,245,650,245,'x')}${axis(70,245,70,45,'y')}<path d="M100 220 Q330 15 610 220" class="${blue}"/><line x1="100" y1="220" x2="190" y2="150" class="${gold}" marker-end="url(#tbxArrow)"/><line x1="100" y1="220" x2="190" y2="220" class="${green}" marker-end="url(#tbxArrow)"/><line x1="100" y1="220" x2="100" y2="150" class="${red}" marker-end="url(#tbxArrow)"/><text x="190" y="142" class="tbx-label">u</text><text x="145" y="238" class="tbx-label">uₓ</text><text x="76" y="142" class="tbx-label">uᵧ</text>`,'Projectile motion split into horizontal and vertical components');
  if(kind==='newton') return svgWrap(`<rect x="300" y="115" width="120" height="70" rx="10" class="tbx-box"/><line x1="360" y1="115" x2="360" y2="45" class="${green}" marker-end="url(#tbxArrow)"/><line x1="360" y1="185" x2="360" y2="265" class="${red}" marker-end="url(#tbxArrow)"/><line x1="300" y1="150" x2="210" y2="150" class="${blue}" marker-end="url(#tbxArrow)"/><line x1="420" y1="150" x2="535" y2="150" class="${gold}" marker-end="url(#tbxArrow)"/><text x="374" y="60" class="tbx-label">normal / tension</text><text x="375" y="255" class="tbx-label">weight</text><text x="160" y="140" class="tbx-label">resistance</text><text x="500" y="140" class="tbx-label">drive</text>`,'Free-body diagram: include only forces acting on the chosen object');
  if(kind==='momentum') return svgWrap(`<rect x="100" y="150" width="90" height="45" rx="8" class="tbx-box"/><rect x="465" y="150" width="120" height="45" rx="8" class="tbx-box"/><line x1="195" y1="172" x2="330" y2="172" class="${blue}" marker-end="url(#tbxArrow)"/><text x="210" y="155" class="tbx-label">m₁u₁</text><line x1="460" y1="172" x2="370" y2="172" class="${green}" marker-end="url(#tbxArrow)"/><text x="405" y="150" class="tbx-label">m₂u₂</text><text x="250" y="245" class="tbx-label">Σp before = Σp after</text>`,'Momentum is conserved in an isolated interaction');
  if(kind==='work') return svgWrap(`${axis(90,235,640,235,'s')}${axis(90,235,90,50,'F')}<polyline points="100,220 250,100 500,100 610,190" class="${blue}"/><polygon points="100,220 250,100 500,100 610,190 610,235 100,235" class="tbx-area"/><text x="280" y="205" class="tbx-label">area = work done</text>`,'Area under a force–displacement graph equals energy transferred');
  if(kind==='energy') return svgWrap(`<rect x="80" y="110" width="150" height="75" rx="14" class="tbx-energy"><text x="120" y="145" class="tbx-label">GPE</text></rect><line x1="230" y1="148" x2="350" y2="148" class="${gold}" marker-end="url(#tbxArrow)"/><rect x="350" y="110" width="150" height="75" rx="14" class="tbx-energy"><text x="390" y="145" class="tbx-label">KE</text></rect><line x1="500" y1="148" x2="605" y2="148" class="${red}" marker-end="url(#tbxArrow)"/><rect x="600" y="105" width="95" height="85" rx="14" class="tbx-energy"><text x="610" y="138" class="tbx-label">internal</text><text x="616" y="160" class="tbx-label">energy</text></rect>`,'Energy transfers between stores; total energy remains conserved');
  if(kind==='hooke') return svgWrap(`${axis(95,235,650,235,'extension')}${axis(95,235,95,45,'force')}<line x1="105" y1="225" x2="420" y2="70" class="${blue}"/><path d="M420 70 Q500 70 610 120" class="${red}"/><text x="230" y="105" class="tbx-label">gradient = k</text><text x="430" y="55" class="tbx-label">limit of proportionality</text>`,'Force–extension behaviour and the limit of proportionality');
  if(kind==='stress') return svgWrap(`<rect x="170" y="90" width="45" height="130" class="tbx-wire"/><line x1="192" y1="90" x2="192" y2="35" class="${gold}" marker-end="url(#tbxArrow)"/><line x1="192" y1="220" x2="192" y2="275" class="${gold}" marker-end="url(#tbxArrow)"/><text x="235" y="150" class="tbx-label">stress = F/A</text><rect x="440" y="75" width="30" height="160" class="tbx-wire ghost"/><text x="490" y="145" class="tbx-label">strain = ΔL/L</text>`,'Stress measures force per area; strain measures fractional extension');
  if(kind==='materials') return svgWrap(`${axis(85,240,650,240,'strain')}${axis(85,240,85,45,'stress')}<path d="M95 230 L245 90 Q330 65 430 150 Q500 190 560 205" class="${blue}"/><path d="M95 230 L305 75 L325 65" class="${red}"/><text x="330" y="55" class="tbx-label">brittle</text><text x="415" y="130" class="tbx-label">ductile / plastic region</text>`,'Qualitative stress–strain curves for brittle and ductile behaviour');
  if(kind==='young') return svgWrap(`${axis(95,235,650,235,'strain')}${axis(95,235,95,45,'stress')}<line x1="105" y1="225" x2="410" y2="60" class="${blue}"/><line x1="105" y1="225" x2="500" y2="120" class="${green}"/><text x="300" y="75" class="tbx-label">larger gradient → larger E</text><text x="380" y="145" class="tbx-label">smaller E</text>`,'Young modulus is the initial stress–strain gradient');
  if(kind==='rp4') return svgWrap(`<line x1="220" y1="45" x2="220" y2="235" class="tbx-wire"/><rect x="175" y="35" width="90" height="20" class="tbx-clamp"/><rect x="185" y="235" width="70" height="35" class="tbx-mass"/><line x1="360" y1="65" x2="360" y2="225" class="tbx-scale"/><text x="390" y="100" class="tbx-label">measure extension</text><text x="285" y="245" class="tbx-label">load F</text><circle cx="545" cy="145" r="45" class="tbx-micro"/><text x="500" y="220" class="tbx-label">micrometer: d</text>`,'Required Practical 4: measure load, extension, length and wire diameter');
  if(kind==='mastery') return svgWrap(`<rect x="70" y="105" width="120" height="70" rx="12" class="tbx-energy"/><text x="108" y="145" class="tbx-label">forces</text><rect x="300" y="40" width="120" height="70" rx="12" class="tbx-energy"/><text x="330" y="80" class="tbx-label">motion</text><rect x="300" y="195" width="120" height="70" rx="12" class="tbx-energy"/><text x="320" y="235" class="tbx-label">energy</text><rect x="535" y="105" width="120" height="70" rx="12" class="tbx-energy"/><text x="552" y="145" class="tbx-label">momentum</text><line x1="190" y1="140" x2="300" y2="78" class="${blue}" marker-end="url(#tbxArrow)"/><line x1="190" y1="140" x2="300" y2="225" class="${gold}" marker-end="url(#tbxArrow)"/><line x1="420" y1="78" x2="535" y2="135" class="${green}" marker-end="url(#tbxArrow)"/><line x1="420" y1="225" x2="535" y2="150" class="${red}" marker-end="url(#tbxArrow)"/>`,'Synoptic mechanics: choose the principle that fits each stage');
  return '';
}

function styles(){
  if(document.getElementById('tbxFullTextbookStyles')) return;
  const style=document.createElement('style');
  style.id='tbxFullTextbookStyles';
  style.textContent=`
  .tbx-full{display:grid;gap:18px}
  .tbx-hero{padding:18px;border:1px solid rgba(103,199,255,.28);border-radius:16px;background:linear-gradient(145deg,rgba(103,199,255,.08),rgba(255,255,255,.02))}
  .tbx-hero h4{font-size:1.25rem;margin:.2rem 0 .45rem}.tbx-hero p{margin:0;line-height:1.65}
  .tbx-progress{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.tbx-progress span{font-size:.72rem;border:1px solid var(--line);border-radius:999px;padding:5px 8px;color:var(--muted)}
  .tbx-section{border:1px solid var(--line);border-radius:15px;padding:16px;background:rgba(255,255,255,.018)}
  .tbx-section h4{margin:0 0 9px;font-size:1.05rem}.tbx-section p{line-height:1.68;margin:0}
  .tbx-diagram{margin:0;border:1px solid rgba(103,199,255,.25);border-radius:15px;padding:12px;background:#07131f}
  .tbx-diagram svg{display:block;width:100%;height:auto;max-height:330px}.tbx-diagram figcaption{font-size:.78rem;color:var(--muted);margin-top:8px;text-align:center}
  .tbx-axis,.tbx-dim{stroke:#7891aa;stroke-width:2;fill:none;color:#7891aa}.tbx-blue{stroke:#67c7ff;stroke-width:4;fill:none;color:#67c7ff}.tbx-gold{stroke:#ffd56a;stroke-width:4;fill:none;color:#ffd56a}.tbx-green{stroke:#63d9a4;stroke-width:4;fill:none;color:#63d9a4}.tbx-red{stroke:#ff8a8a;stroke-width:4;fill:none;color:#ff8a8a}.tbx-label{fill:#dceaff;font:15px system-ui}.tbx-beam{stroke:#aebdcb;stroke-width:9}.tbx-pivot{fill:#71859a}.tbx-box{fill:#29455e;stroke:#94b0c9;stroke-width:2}.tbx-area{fill:rgba(103,199,255,.12);stroke:none}.tbx-ball{fill:#ffd56a}.tbx-ball.ghost{opacity:.65}.tbx-ball.ghost2{opacity:.35}.tbx-device,.tbx-gate,.tbx-clamp,.tbx-mass{fill:#4c6579}.tbx-wire{fill:#9ec4dc}.tbx-wire.ghost{opacity:.45}.tbx-scale{stroke:#a9bad0;stroke-width:6}.tbx-micro{fill:none;stroke:#a9bad0;stroke-width:8}.tbx-energy{fill:#17314a;stroke:#5e87a8;stroke-width:2}
  .tbx-equations{border:1px solid var(--line);border-radius:15px;padding:15px;background:rgba(103,199,255,.035)}.tbx-equations h4{margin:0 0 10px}.tbx-equation-row{display:flex;gap:8px;flex-wrap:wrap}.tbx-equation-row .formula-chip{font-size:.9rem}
  .tbx-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}.tbx-card{border:1px solid var(--line);border-radius:14px;padding:14px;background:rgba(255,255,255,.02)}.tbx-card h4{margin:0 0 8px}.tbx-card ul{margin:.35rem 0 0;padding-left:20px}.tbx-card li{margin:6px 0;line-height:1.45}.tbx-worked{border-left:4px solid #63d9a4}.tbx-warning{border-left:4px solid #ffb66a}
  .tbx-selfcheck{padding:14px;border:1px dashed rgba(103,199,255,.35);border-radius:14px}.tbx-selfcheck strong{display:block;margin-bottom:6px}
  @media(max-width:760px){.tbx-two{grid-template-columns:1fr}.tbx-section{padding:13px}.tbx-diagram{padding:7px}.tbx-label{font-size:13px}}
  `;
  document.head.appendChild(style);
}

function list(items){return '<ul>'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';}
function renderChapter(chapter,title){
  return `<div class="tbx-full" data-rich-textbook="1">
    <section class="tbx-hero"><span class="eyebrow">Full textbook chapter</span><h4>${title}</h4><p>${chapter.strap}</p><div class="tbx-progress"><span>Detailed theory</span><span>Diagram/graph</span><span>Equations</span><span>Worked example</span><span>Exam technique</span></div></section>
    ${chapter.sections.slice(0,2).map(s=>`<article class="tbx-section"><h4>${s[0]}</h4><p>${s[1]}</p></article>`).join('')}
    ${diagram(chapter.diagram)}
    ${chapter.sections.slice(2).map(s=>`<article class="tbx-section"><h4>${s[0]}</h4><p>${s[1]}</p></article>`).join('')}
    <section class="tbx-equations"><h4>Key equations — click an equation for a breakdown</h4><div class="tbx-equation-row">${chapter.equations.map(e=>`<span class="formula-chip textbook-equation" role="button" tabindex="0" title="Click for equation breakdown">${e}</span>`).join('')}</div></section>
    <div class="tbx-two"><article class="tbx-card tbx-worked"><h4>Worked example</h4><p>${chapter.worked}</p></article><article class="tbx-card"><h4>Exam focus</h4>${list(chapter.exam)}</article></div>
    <div class="tbx-two"><article class="tbx-card tbx-warning"><h4>Common mistakes</h4>${list(chapter.mistakes)}</article><article class="tbx-selfcheck"><strong>Before you leave this textbook section</strong><span>Can you explain the diagram, state when each equation is valid, complete the worked example without looking, and identify one common mistake?</span></article></div>
  </div>`;
}

function currentTitle(panel){
  const h2=panel.querySelector(':scope > h2');
  return h2 ? h2.textContent.trim() : '';
}
function enhance(){
  const panel=document.getElementById('lessonPanel');
  if(!panel) return;
  const title=currentTitle(panel), chapter=CHAPTERS[title];
  if(!chapter) return;
  const host=panel.querySelector('[data-chunk-panel="textbook"] .guided-textbook');
  if(!host || host.dataset.richTextbook==='1') return;
  host.dataset.richTextbook='1';
  host.innerHTML=renderChapter(chapter,title);
}

styles();
const panel=document.getElementById('lessonPanel');
if(panel){
  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance();});};
  new MutationObserver(schedule).observe(panel,{childList:true,subtree:true});
  schedule();
}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-chunk="textbook"]')) setTimeout(enhance,0);
});
})();