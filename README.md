# SpaceX Flights 

An interactive history of SpaceX flights using their public API as a data source. The intention for this project is to be used as an educational resource for people interested in spaceflight. 

There are two interactive parts to this project, the timeline and the mission show page.

# I. The Timeline (Index page)

### Description

The introductory screen will show a scrollable timeline starting from spaceX's first flight and ending on its last flight. On the timeline, every flight will be marked with a green bar (successful), red bar (failure) or yellow bar (mixed). 

### User actions

+ left/right arrows: Earlier/later in history (scroll through timeline)

+ scroll wheel: zoom in/out

+ hover over mission: shows subset of mission details

+ click on mission: open mission show page, hide timeline

# II. Mission Interactive (Show page)

### Description

When the user clicks on a mission, this overlays the timeline and takes up the entire screen. 

### User actions 

+ Escape key or click on 'X' button: close 

+ Spacebar or click on 'action' button: perform the next action (triggers animation)
  1. Launch
  2. Main Engine Cutoff and Booster separation 
  3. Second engine startup
  4. Restart (end of animations)
  5. Pause (if spacebar is pressed in the middle of an animation)

# Animations 

## 1. Launch -> Liftoff/Failure

#### Foreground:

Ground control scaffolding thing, rocket (Falcon 9)

#### Background:

Ground (launchpad), sky

#### Effects:

Fire, smoke

#### Notes:

If the rocket failed at this point, show explosion after countdown instead of liftoff (launch_success boolean in api)

## 2. Main engine cutoff and booster separation 

#### Foreground: 

Rocket

#### Background: 

Gradient sky-space 

#### Effects: 

smoke

#### Notes:

Rocket should start to rotate to the right at this point to show that it is starting orbit. Booster stays upright for the most part, a minor rotation might look nice though. Pause for next animation the moment the rocket (top screen) is horizontal and facing right and the booster reached the bottom of the screen. 

## 3. Second engine startup (dual screen UNLESS the landing_type is null, in which case only show the top screen)

#### Top screen foreground: 

Rocket (sans booster)

#### Top screen background: 

Space

#### Top screen effects: 

fire

#### Bottom screen foreground:

Booster only at first, then if ASDS landing there needs to be a ship in the foreground as well.

#### Bottom screen Background:

landing_type
ocean: ocean, sky
ASDS: ocean, sky
RTLS: ground, sky
null: I guess don't even split the screen.

#### Bottom screen effects:

explosion, splashdown

#### Notes:

landing_type: ocean, ASDS (drone ship), RTLS (return to launch site), null. Top screen should just run until the rocket has burned out its fuel, then the next action becomes restart 

## 4. Restart 

Say mission success or mission failure across screen. Spacebar restarts the animation. 







