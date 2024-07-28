# snakes-and-ladders

# Logic Used In JavaScript Code:
    1. GamePlay :
        -> Game Starts With All The Players At Position 0 (Out Of Board)
        -> Players Enter The Board At Position 1 If Dice Value Is 6 Or 1
        -> Players Keeps Their Turn As Long As Dice Value Keeps Coming Out To Be 6
        -> After Entering The Board Players Takes The Number Of Steps As Dice Value
        -> If A Player Enters A Snake's Head Cell Then They Are Thrown To The Cell Of Snake's Tail Cell
        -> If A Player Enters A Ladder's Foot Cell Then They Climb Up To The Cell Of Ladder's Top Cell
        -> A Player Wins If They Enter The 100th Cell
        -> A Player Will Not Move If Players's Current Position Plus Dice Value Exceeds 100
        
# Bugs : 

# Fixed Bugs :
        -> Player's Name Not Appearing In 1st Cell On The Board
        -> Players Repeating The Turn Even If Dice Value Is Not 6 Before Entering The Board Or When They Enter The 
           Board At 1st Cell

# Features To Be Added :
    1. Adding More Players Feature
    2. Adding Real-Time Multiplayer Gameplay Across Multiple Devices
    3. Adding Sound Effects
    4. Adding Smooth Animation Of Dice Roll And Players Moving On Board