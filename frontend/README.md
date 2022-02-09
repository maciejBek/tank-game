# 1. INTRODUCTION

## 1.1 PURPOSE

The purpose of this document is to build an online game, a remake of legendary Famicom game “Battle City”.

## 1.2 INTENDED AUDIENCE AND READING SUGGESTIONS

This project has been implemented as part of university course “Software System Engineering”, under the guidance of professors. It’s only a prototype of old game for new experience of online gaming process. You can easily improve coordination and memory. The tank’s movements that occur on the screen depend on a keyboard control, which improves coordination, and the development of the game has rules, objectives and paths that stimulate short and long term memory. 

## 1.3 PROJECT SCOPE
The purpose of the online game is to allow you to play the old Famicom game “Battle City” using only the Internet and a standard browser. The game is based on ReactJS technology, using Redux and a relational database with user's progress. In future, we hope to provide a comfortable gaming experience, free to use, with personal tanks constructor and the ability to play in any device.

# 2. OVERALL DESCRIPTION
## 2.1 DISTRIBUTED DATABASE:

A battlecity database system stores the following user's information:
-	User name (login);
-	Hashed password;
-	Email address;
-	Current level (we implemented only four level, but even this is hard to win);
-	Number of all destroyed enemies;
-	Number of all fails;
-	User tank (in future, we will give a chance to choose user tank in options).

## 2.2 PLAYER CLASS and CHARACTERISTICS

The player, controlling a tank, must destroy enemy tanks in each level, which enter the playfield from the top of the screen. The enemy tanks attempt to destroy the player's base (represented on the map as an eagle), as well as the human tank itself. A level is completed when the player destroys all 20 enemy tanks, but the game ends if the player's base is destroyed or the player loses all available lives.

The system will support some user privileges, changing tanks design (and opportunities) and extra lives. Player will have a chance to buy new life (its costs 50 points). One destroyed enemy gives 10 points.

Player can control tank using the following keys:
-	W (to move up)
-	S (to move down)
-	A (to move left)
-	D (to move right)
-	↑ (to move up)
-	↓ (to move down)
-	← (to move left)
-	→ (to move right)
-	Space (to shoot)
-	ESC (take a pause)

If player wants, he can reset progress to start (level 1, all point lost).

## 2.3 OPERATING ENVIRONMENT

Operating environment for gaming is listed below.
-	JavaScript support;
-	Operating system: Windows, Linux, MAC OS.
-	PHP, Node.js, ReactJS 
-	Edge 16+
-	Firefox 60+
-	Chrome 61+
-	Opera 40+
-	Safari 11+
-	MySQL

## 2.4	DESIGN and IMPLEMENTATION CONSTRAINTS

1.	Screen ratio and resolution - ideally game should fit entirely within the user’s screen
2.	Device whether laptop or desktop (optional) 
3.	Client-server architecture
4.	Web-based
5.	Security of game play
6.	SQL commands for above queries/applications
7.	Implement the database at least using a centralized database management system.

## 2.5 ASSUMPTION DEPENDENCIES
-	Good Internet speed
-	JavaScript support
-	Hardware (user’s processor must be fast enough to handle GPU calls in)
-	Operating system: Windows, Linux, MAC OS
-	PHP 
-	Edge 16+
-	Firefox 60+
-	Chrome 61+
-	Safari 11+
-	Server must be able to run node.js applications
-	Server must have MySQL installed
-	Controlling only by keyboard.
