// Array of LLM models
const llmModels = [
    "GPT-4o",
    "Claude 3.7 Sonnet",
    "Gemini 2.5 Pro",
    "Llama 3.1",
    "Qwen2.5",
    "DeepSeek R1"
];

// DOM elements
const dice = document.getElementById('dice');
const llmNames = document.querySelectorAll('#llm-name');
const rollButton = document.getElementById('roll-button');
const diceSound = document.getElementById('dice-sound');

// Function to get a random face number (1-6)
function getRandomFace() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to get the rotation for a specific face
function getRotationForFace(face) {
    const rotations = {
        1: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
        2: 'rotateX(180deg) rotateY(0deg) rotateZ(0deg)',
        3: 'rotateX(0deg) rotateY(90deg) rotateZ(0deg)',
        4: 'rotateX(0deg) rotateY(-90deg) rotateZ(0deg)',
        5: 'rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
        6: 'rotateX(-90deg) rotateY(0deg) rotateZ(0deg)'
    };
    return rotations[face];
}

// Function to animate the dice
function animateDice() {
    // Remove any existing animation classes
    dice.classList.remove('rolling', 'shake');
    
    // Force a reflow
    void dice.offsetWidth;
    
    // Add rolling animation
    dice.classList.add('rolling');
    
    // Remove rolling animation after it completes
    setTimeout(() => {
        dice.classList.remove('rolling');
    }, 1500);
}

// Function to update all faces with the same text
function updateAllFaces(text) {
    llmNames.forEach(face => {
        face.textContent = text;
    });
}

// Function to roll the dice
function rollDice() {
    // Disable button during animation
    rollButton.disabled = true;
    
    // Play sound effect
    diceSound.currentTime = 0;
    diceSound.play();
    
    // Animate the dice
    animateDice();
    
    // Wait for animation to complete before showing result
    setTimeout(() => {
        const selectedFace = getRandomFace();
        const rotation = getRotationForFace(selectedFace);
        dice.style.transform = rotation;
        
        // Re-enable button
        rollButton.disabled = false;
    }, 1500);
}

// Event listener for the roll button
rollButton.addEventListener('click', rollDice);

// Initialize with a random face
const initialFace = getRandomFace();
dice.style.transform = getRotationForFace(initialFace); 