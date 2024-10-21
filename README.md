# Mouse training interactive game

[![codecov](https://codecov.io/github/irebah/mouse-training/graph/badge.svg?token=SXGPSEOD4N)](https://codecov.io/github/irebah/mouse-training)
[![Build, test and deploy](https://github.com/irebah/mouse-training/actions/workflows/build.yml/badge.svg)](https://github.com/irebah/mouse-training/actions/workflows/build.yml)

## Test Your Speed!

Challenge yourself to click as many dots as you can in just 60 seconds!

This application is perfect for assessing your mouse-clicking speed or helping children improve their coordination and skills. Compete against your own best scores or challenge friends and family to see who can click the most dots!

You can view the live version of the project at [https://irebah.github.io/mouse-training](https://irebah.github.io/mouse-training).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Features

- Interactive game to test ability and focus
- Size of the dots as well as the gap in between them is configurable at [constants](./src/constants/index.ts)
- The time for the game as well as the moment when it should become red is configurable at [constants](./src/constants/index.ts)
- The colour of the inactive dots as well of the active dots is configurable at [constants](./src/constants/index.ts)
- Lightweight and fast development environment using Vite
- TypeScript for type safety and improved developer experience

## Technologies

- **Vite**: A fast build tool that provides an optimal development environment.
- **TypeScript**: A superset of JavaScript that offers static typing for better code quality.
- **Vitest**: A fast and lightweight testing framework for Vite.
- **TailwindCSS**: A utility-first CSS framework that allows for rapid UI development.
- **pnpm**: A fast, disk space-efficient package manager.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/irebah/mouse-training.git
   cd mouse-training
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
    pnpm dev
   ```

4. **Open your browser: Navigate to http://localhost:5173 to view the application.**

## Usage

To start the game, click the Start button. The timer will begin counting down from the default value of 1 minute. Your objective is to click on as many black dots as possible before the timer runs out.

When you have only 20 seconds left, the timer will turn red to alert you about the remaining time. Additionally, a beep will sound when there are only 10 seconds left, adding to the urgency. On the right side of the screen, you’ll see a counter displaying the total number of dots you’ve clicked. Keep an eye on the timer and try to beat your previous score!

Have fun!

## License

This project is licensed under the MIT License. See the [LICENSE file](./LICENSE.md) for details.

The sound used in the project is 10 Second Countdown by thomas_evdokimoff -- https://freesound.org/s/202193/ -- License: Attribution 4.0

The sound used in the project is acess denied buzz by Jacco18 -- https://freesound.org/s/419023/ -- License: Creative Commons 0
