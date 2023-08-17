import { Mountain } from "./mountains";

class EpicMountain extends Mountain {
    super (name, image, description);
}

const beaverCreakResort = new EpicMountain(
    'Beaver Creak Resort',
    'https://files.skimap.org/g7h3ja29nc7c60g5dquqp6damw5x',
    'Beaver Creek charms with fantastic extras: Heated moving walkways, fresh-baked cookies, a first-tracks program for early risers, a white-carpet club, wine-and-snowshoe excursions and acres of corduroy and powder waiting for skiers and riders to swish through.'
)