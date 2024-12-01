#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';

const list = {
    0: `    █████   
  ███░░░███ 
 ███   ░░███
░███    ░███
░███    ░███
░░███   ███ 
 ░░░█████░  
   ░░░░░░`,

    1: ` ████ 
░░███ 
 ░███ 
 ░███ 
 ░███ 
 ░███ 
 █████
░░░░░`,
    2: `  ████████ 
 ███░░░░███
░░░    ░███
   ███████ 
  ███░░░░  
 ███      █
░██████████
░░░░░░░░░░`,
    3: `  ████████ 
 ███░░░░███
░░░    ░███
   ██████░ 
  ░░░░░░███
 ███   ░███
░░████████ 
 ░░░░░░░░`,
    4: ` █████ █████ 
░░███ ░░███  
 ░███  ░███ █
 ░███████████
 ░░░░░░░███░█
       ░███░ 
       █████ 
      ░░░░░ `,
    5: ` ██████████
░███░░░░░░█
░███     ░ 
░█████████ 
░░░░░░░░███
 ███   ░███
░░████████ 
 ░░░░░░░░`,
    6: `  ████████ 
 ███░░░░███
░███   ░░░ 
░█████████ 
░███░░░░███
░███   ░███
░░████████ 
 ░░░░░░░░`,
    7: ` ██████████
░███░░░░███
░░░    ███ 
      ███  
     ███   
    ███    
   ███     
  ░░░ `,
    8: `  ████████  
 ███░░░░███ 
░███   ░███ 
░░████████  
 ███░░░░███ 
░███   ░███ 
░░████████  
 ░░░░░░░░`,
    9: `  ████████ 
 ███░░░░███
░███   ░███
░░█████████
 ░░░░░░░███
 ███   ░███
░░████████ 
 ░░░░░░░░`,
};

program
    .version('0.0.1')
    .description('A CLI for managing your time')
    .option('-t, --time <time>', 'The time you want to track')
    .action((options) => {
        const minutes = parseInt(options.time, 10);
        if (isNaN(minutes)) {
            console.error(chalk.red('Please provide a valid number of minutes.'));
            process.exit(1);
        }

        console.log(chalk.green(`Starting a timer for ${minutes} minutes...`));

        const purple = chalk.hex('#bc62f56');

        
        const startTime = Date.now();
        const interval = setInterval(() => {
            const remainingMinutes = Math.floor(minutes - (Date.now() - startTime) / 60000);
            const remainingSeconds = Math.floor((minutes * 60 - (Date.now() - startTime) / 1000) % 60);
            
            // Clear previous lines
            console.clear();
            
            const minutesStr = String(remainingMinutes).padStart(2, '0');
            const secondsStr = String(remainingSeconds).padStart(2, '0');
            
            // Split each ASCII art number into lines
            const lines = new Array(8).fill('');
            
            // Combine minutes digits
            minutesStr.split('').forEach(digit => {
                const digitArt = list[digit].split('\n');
                digitArt.forEach((line, index) => {
                    lines[index] += line + ' ';
                });
            });
            
            // Combine seconds digits
            secondsStr.split('').forEach(digit => {
                const digitArt = list[digit].split('\n');
                digitArt.forEach((line, index) => {
                    lines[index] += line + ' ';
                });
            });
            
            // Output all lines
            console.log(purple(lines.join('\n')));
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            console.clear();
            console.log(chalk.blue('Time is up!'));
        }, minutes * 60 * 1000);
    })

program.parse(process.argv);