# Noli: Trials of San Diego

*An interactive digital board game based on José Rizal's* Noli Me Tangere

> **Final Course Output: Interactive Digital Game**
> Group members: 

---

## 1. Title of the game

**Noli: Trials of San Diego**

## 2. Purpose and objectives

**Purpose:** 

**Objectives.** 

## 3. Target audience / players


## 4. Theme


## 5. Brief description


## 6. Rules and scoring system

### Rules

1. Choose the number of players (2 to 4) and click **New game**. Players can type their own names.
2. On your turn, click **Roll the die** (1 to 6) and your token moves that many spaces.
3. **Normal spaces** have no effect.
4. **Character Checkpoint** spaces (gold, marked ✦) open a challenge:
   - Three character cards are drawn at random, each showing a difficulty.
   - Pick one card and answer its multiple-choice question (A to D).
   - The correct answer is shown with a short explanation from the novel.
5. If you rise or fall onto another Character Checkpoint after answering, it doesn't count. Your turn ends there. A checkpoint only counts when you land on it with a die roll.
6. You cannot go below space 1.
7. The **first player to reach space 50** wins. An exact roll is not needed.

### Scoring

There are no points. **Your position on the board is your score.** Each question moves you:

| Difficulty | Correct answer | Wrong answer |
|---|---|---|
| Easy   | forward 2 spaces | back 2 spaces |
| Medium | forward 4 spaces | back 4 spaces |
| Hard   | forward 6 spaces | back 6 spaces |

Choosing a card is a risk decision: Hard cards move you furthest, but a wrong answer costs just as much.

## 7. Game design

### Layout

- **Board:** 50 spaces in 5 rows of 10. The path snakes from **Start** (space 1, bottom left) up to **Finish** (space 50, top right).
- **Players panel:** each player's coloured token, editable name and current space. The player whose turn it is is highlighted.
- **Die and status line:** shows the roll and what just happened.
- **Story panel:** short narration for each move ("A quiet street in San Diego…").
- **Checkpoint window:** a large pop-up for choosing a character card and answering the question.
- **Rules panel:** the rules, always visible on the page.

### Game elements

| Element | Description |
|---|---|
| Tokens | One coloured circle per player (red, blue, gold, purple) |
| Die | A single six-sided die with a short roll animation |
| Normal spaces | Cream tiles with no effect |
| Character Checkpoints | 12 gold tiles: spaces 4, 8, 13, 17, 21, 26, 30, 34, 38, 42, 45 and 48 |
| Character cards | A portrait, name, role and difficulty badge (Easy, Medium or Hard) |
| Finish | Space 50, in red |

### Characters

13 characters from the novel, each with an original illustrated portrait:

| Character | Role in the game |
|---|---|
| Crisóstomo Ibarra | The young heir who returns from Europe |
| María Clara | Ibarra's beloved |
| Padre Dámaso | The proud Franciscan friar |
| Elías | The mysterious boatman |
| Sisa | The mother who lost her sons |
| Basilio | Sisa's elder son |
| Crispín | Sisa's younger son |
| Padre Salvi | The new parish priest of San Diego |
| Kapitan Tiago | Rich host of the opening dinner |
| Doña Victorina | The woman who pretends to be Spanish |
| Pilosopo Tasio | The town's scholar |
| Tenyente Guevara | The officer who tells the truth |
| Doña Consolación | Wife of the Alferez |

The question bank currently has **38 questions** across Easy, Medium, and Hard.

### Challenges and progress

- **Challenges:** multiple-choice questions at three difficulty levels. Characters, difficulty and questions are drawn at random, so every game plays out differently.
- **Progress indicators:** token position on the board, "Space N" beside each player's name, and the turn highlight.
- **Feedback:** right and wrong answers are coloured green and red, followed by a one-sentence explanation from the novel.
- **Reward:** the winner's name appears in their token colour with a burst of confetti.

### Winning and losing conditions

- **Win:** be the first player to reach space 50.
- **Lose:** the game ends as soon as one player reaches space 50; everyone else loses. Wrong answers can push you back, but no player is eliminated before then.

---

## How to play

The game is a browser-based HTML5 game, so nothing needs to be installed.

- **Online:** open the published link: https://github.com/alexasophia16/GERIZAL-FinalCourseOutput
- **Offline copy:** download the folder and double-click `index.html`. An internet connection is needed the first time for the fonts and Bootstrap.

Works on computers, tablets and phones.

## Built with

- HTML, CSS and JavaScript
- [Bootstrap 5](https://getbootstrap.com/) for layout and the pop-up window
- Google Fonts: IM Fell English and Nunito Sans

## Project files

| File | Contents |
|---|---|
| `index.html` | The page |
| `style.css` | Colours, fonts and layout |
| `game.js` | Game rules: die, movement, checkpoints, winning |
| `questions.js` | Characters and questions (edit this to add questions; instructions are at the top of the file) |
| `portraits.js` | The character portraits |

## Publishing

The finished game is shared as a playable browser link using **GitHub Pages** (as an HTML game). The game collects no personal information: player names stay on the device and are not saved.
