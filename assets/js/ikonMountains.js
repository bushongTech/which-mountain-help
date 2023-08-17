import { Mountain } from "./mountains";

class IkonMountain extends Mountain {
    super (name, image, description);
};

const arapahoeBasin = new IkonMountain(
    'Arapahoe Basin', 
    'https://myskisearch.com/wp-content/uploads/Araphahoe-Basin-Ski-Area-Trail-Map.png',
    'Known as "The Legend," A-Basin has the longest ski and ride season in Colorado, the highest restaurant in the U.S., and the steepest in-bounds terrain in the state. Challenge yourself or learn on our beginner terrain, all in a relaxed atmosphere and stunning setting.'
    )