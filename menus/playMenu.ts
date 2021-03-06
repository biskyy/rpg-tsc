const inquirer = require('inquirer');
import { Player, hunt } from '../player/player';
import { Area } from '../locations/area';
import { City } from '../locations/city';
import { mainMenu } from './mainMenu';
import { goToMenu } from './goToMenu';
import { shopMenu } from './shopMenu';
import { homeMenu } from './homeMenu';
import { cls } from '../helpers/utils';
import { monsters } from '../monsters';
import { bsMenu } from './bsMenu';
import { locationInfo, profile, inventory } from '../player/playerUtils';
import { playerMenu } from './playerMenu';

export const playMenu = (player: Player) => {
  let _choices;

  switch (player.location) {
    case Area.CITY:
      _choices = [
        'Home',
        'Shop',
        'Blacksmith',
        'Player Info',
        'Go to..',
        'Help',
        'Back',
      ];
      break;

    case Area.FOREST:
      _choices = ['Hunt', 'Player Info', 'Go to..', 'Help', 'Back'];
      break;

    default:
      break;
  }

  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select a option!\n',
        name: 'choice',
        choices: _choices,
        pageSize: 12,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Help':
          cls();
          locationInfo(player);
          playMenu(player);
          break;
        case 'Hunt':
          hunt(player, monsters);
          playMenu(player);
          break;
        case 'Shop':
          cls();
          player.location = City.SHOP;
          shopMenu(player);
          break;
        case 'Blacksmith':
          cls();
          player.location = City.BLACKSMITH;
          bsMenu(player);
          break;
        case 'Player Info':
          cls();
          playerMenu(player);
          break;
        case 'Go to..':
          cls();
          goToMenu(player);
          break;
        case 'Home':
          cls();
          player.location = City.HOME;
          homeMenu(player);
          break;
        case 'Back':
          cls();
          mainMenu(player);
          break;
      }
    });
};
