const apiKey = '484da9db5d4a9dce2a111a2bc5be9943';
const now = dayjs();
let lat;
let lon;
let cityName = 'Aspen';
let ikonEl = $('#ikon-hero');
let allMountainEl = $('#all-mountain-hero');
let epicEl = $('#epic-hero');
let weatherUrlByCity = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
let todaysHumidityEl = $('#todays-humidity');
let todaysTempEl = $('#todays-temp');
let todaysWindEl = $('#todays-wind');
let todaysWeatherIconEl = $('#todays-icon');
let cityEl = $('#city');
let dateEl = $('#date');
dateEl.text(dayjs().format('(MM/DD/YYYY)'));
let dayOne = Number(dayjs().format('DD')) + 1;
let dayOneString = dayOne.toString();
let dayTwo = Number(dayjs().format('DD')) + 2;
let dayTwoString = dayTwo.toString();
let dayThree = Number(dayjs().format('DD')) + 3;
let dayThreeString = dayThree.toString();
let dayFour = Number(dayjs().format('DD')) + 4;
let dayFourString = dayFour.toString();
let dayFive = Number(dayjs().format('DD')) + 5;
let dayFiveString = dayFive.toString();
let dayOneDate = dayjs().format(('MM/' + dayOneString + '/YYYY'));
let dayTwoDate = dayjs().format(('MM/' + dayTwoString + '/YYYY'));
let dayThreeDate = dayjs().format(('MM/' + dayThreeString + '/YYYY'));
let dayFourDate = dayjs().format(('MM/' + dayFourString + '/YYYY'));
let dayFiveDate = dayjs().format(('MM/' + dayFiveString + '/YYYY'));

// Below makes an array that will hold the info for the mountains
const mountains = [
    {
        'name': 'ARAPAHOE BASIN',
        'image': 'https://myskisearch.com/wp-content/uploads/Araphahoe-Basin-Ski-Area-Trail-Map.png',
        'description': 'Known as "The Legend," A-Basin has the longest ski and ride season in Colorado, the highest restaurant in the U.S., and the steepest in-bounds terrain in the state. Challenge yourself or learn on our beginner terrain, all in a relaxed atmosphere and stunning setting.'
    },
    {
        'name': 'ASPEN HIGHLANDS',
        'image': 'https://res.cloudinary.com/liftopia/image/upload/c_fit,d_defaults:default_logo_1.png,f_auto,h_800,q_auto,w_800/v1/production/trail_maps/835b7f313bb133afa7da31c1209d9728.jpg',
        'description': 'When new snow at Aspen Highlands reaches mammoth proportions, you’re in for a epic day of Colorado’s signature light-and-dry powder. Insiders at the ski area recommend studying the trail map to find hidden gems that drop into gladed, untouched expert areas.'
    },
    {
        'name': 'ASPEN MOUNTAIN',
        'image': 'https://www.freeride.com/img/resort/skimap/large/193.jpg',
        'description': 'While Aspen is known throughout the world as a posh winter playground, more skiers are discovering the mountain’s challenging double blacks and chutes. In town, stop into the numerous galleries and the Aspen Art Museum or see a show at the Wheeler Opera House or the Harris Concert Hall.'
    },
    {
        'name': 'BEAVER CREEK RESORT',
        'image': 'https://files.skimap.org/g7h3ja29nc7c60g5dquqp6damw5x',
        'description': 'Beaver Creek charms with fantastic extras: Heated moving walkways, fresh-baked cookies, a first-tracks program for early risers, a white-carpet club, wine-and-snowshoe excursions and acres of corduroy and powder waiting for skiers and riders to swish through. '
    },
    {
        'name': 'BRECKENRIDGE SKI RESORT',
        'image': 'https://www.visitbreck.com/sites/default/files/uploads/trail_maps_1.jpg',
        'description': 'Breckenridge is one of North America’s most popular resorts, in part because of its variety of terrain: long groomed trails, monster mogul runs, steep chutes, glades and plenty of family-friendly beginner areas. The resort was also one of the first to allow snowboarding on its slopes, and its Freeway Terrain Park is arguably one of the best in North America.'
    },
    {
        'name': 'BUTTERMILK',
        'image': 'https://res.cloudinary.com/liftopia/image/upload/c_fit,d_defaults:default_logo_1.png,f_auto,h_800,q_auto,w_800/v1/production/trail_maps/95f168cea962cf73d6de0d34e038228a.jpg',
        'description': 'Buttermilk has a well-earned reputation as a great venue for beginner skiers and snowboarders. Wide, rolling trails are ideal for those just getting their snow legs, and none of its runs are rated expert. For an unprecedented 18 straight years, it has been the home of ESPN’s Winter X Games, where the likes of Olympians Shaun White, Hannah Teter, local Gretchen Bleiler and many more have captured snowboarding medals.'
    },
    {
        'name': 'COPPER MOUNTAIN',
        'image': 'https://www.coppervacations.com/sites/default/files/uploads/copper_mountain_frontside_skiing_trail_map.jpeg',
        'description': 'People who ski and ride Copper love to tout its perfect layout. They have Mother Nature to thank for arranging its slopes so adeptly: Beginner, intermediate and expert runs are each clustered with like-leveled terrain, ensuring beginners won’t make a surprise trip to the top of a steep, mogul-laden run.'
    },
    {
        'name': 'CRESTED BUTTE MOUNTAIN RESORT',
        'image': 'https://cdn.ski/UjqutMyKAtDVRmbK.jpeg',
        'description': 'Crested Butte has it all: wide-open green and blue trails, expert bowls and plenty of unexplored lines and uncrowded slopes. One thing to really take advantage of, however, is the CB Backcountry Guide. Professional instructors teach would-be backcountry enthusiasts how to navigate safely and explore untouched powder.'
    },
    {
        'name': 'ECHO MOUNTAIN RESORT',
        'image': 'https://echomntn.com/images/uploads/echotrailmap2022_ST_DAY_10.07-3.jpg',
        'description': "Just south of Idaho Springs you'll find 60 acres of skiable terrain, making it the closest ski resort to Denver. Complete with a redesigned lodge featuring a restaurant and bar overlooking the Continental Divide, Echo Mountain is an affordable option for skiers and boarders along the Front Range. For those who can’t get up there before the work day ends, the slopes are open til 9pm for skiing under the stars."
    },
    {
        'name': 'ELDORA MOUNTAIN RESORT',
        'image': 'https://s3.onthesnow.com/images/trailmaps/salt-lake-city/eldora-mountain-resort/20190212183827/large.jpg',
        'description': `Eldora’s proximity to Boulder and Denver is one of the reasons it’s known as a “locals’ mountain.” The fact that they have terrain to keep the whole family busy all day doesn’t hurt either. The Eldora Nordic Center features a network of nearly 25 miles of peaceful cross-country ski and snowshoe trails just steps from the downhill ski area.`
    },
    {
        'name': 'GRANBY RANCH',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/solvista-golf-ski-ranch-silver-creek/20141211133509/large.jpg',
        'description': `Ski Granby Ranch’s fun lesson programs, easy pace and affordable prices make it a long-time family favorite. There’s no better place to wind down at the end of the day than the fire pit at the base of the mountain, where the hot cocoa flows and everyone recounts the day’s snowy triumphs.`
    },
    {
        'name': 'HESPERUS SKI AREA',
        'image': 'https://files.skimap.org/2pfbbaezjaqmo0j4vjs2j06rjg2p',
        'description': `Eleven miles west of Durango, Hesperus has been is an especially great option for families in the southwest part of Colorado since 1962, and it's the region's largest night-skiing operation. Hesperus' unassuming, small-ski-area ambiance makes its 26 trails and 160 acres an idyllic winter escape.`
    },
    {
        'name': 'HOWELSEN HILL SKI AREA',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/howelsen-hill/20190215174428/large.jpg',
        'description': `Routinely in the shadow of its much larger neighbor, Steamboat, it's easy to forget Howelsen's pedigree. Open since 1915, it's the oldest ski area in Colorado, has the largest natural ski-jumping complex in North America and has long been a training ground for Olympic skiers. It’s also one a handful of resorts in Colorado to offer after-dark skiing. Floating through the night beneath the glow of the slope’s lights is an other-worldly experience.`
    },
    {
        'name': 'KENDALL MOUNTAIN SKI AREA',
        'image': 'https://images.squarespace-cdn.com/content/v1/5dade5d6f3de04278ab5ade9/1572538676771-GIKU5P0148RTON4N579G/image-asset.jpeg?format=2500w',
        'description': `Situated in Silverton, Kendall Mountain is loved by locals for its intimate, family-friendly ambiance. The ski area has four groomed trails, a terrain park and tree skiing. Off-the-slopes activities include ice skating, sledding, snowshoeing and cross-country skiing.`
    },
    {
        'name': 'KEYSTONE',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/keystone/20161208212713/large.jpg',
        'description': 'Keystone boasts three mountains full of bowls, steeps, trails, a lift-served tubing hill and one of the state’s longest ski days. Skiers can watch the sun set at 11,000 feet and ski into the night. After a day on the slopes, a moonlight gondola ride takes you to the top of North Peak for a romantic dinner at Alpenglow Stube.'
    },
    {
        'name': 'LOVELAND SKI AREA',
        'image': 'https://files.skimap.org/xme65bmmsvtidi5dg878jvjvnplm',
        'description': 'One of Loveland’s favorite things to brag about is that it averages nearly 400 inches of snow each season, more than any other Front Range ski area. You’re more likely to find untracked snow even days after a storm. For added convenience, they have two separate base areas, one catering to beginners with wide-open terrain and one for intermediate to advanced skiers and riders with runs steep and deep.'
    },
    {
        'name': 'MONARCH MOUNTAIN',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/monarch-mountain/20190927174743/large.jpg',
        'description': 'Monarch’s perch, high atop the Continental Divide, makes it one of the best spots in the state for fresh powder. A short walk from the parking lot to the lifts, roomy slopes and one of Colorado’s most laid-back attitudes has made it a hit with families. Ride to the top of the narrow, between-tree Panorama Lift for 360-degree views of the divide.'
    },
    {
        'name': 'POWDERHORN MOUNTAIN RESORT',
        'image': 'https://s3.onthesnow.com/images/trailmaps/michigan/big-powderhorn-mountain/20190205185311/large.jpg',
        'description': 'This resort near Grand Junction has one of the most unique views in Colorado’s ski country. Located on the Grand Mesa, the largest flat-top mountain in the world, skiers and riders will see something more like the Grand Canyon than the typical alpine view.'
    },
    {
        'name': 'PURGATORY RESORT',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/durango-mountain-resort/20181218175225/large.jpg',
        'description': "Purgatory's (formerly Durango Mountain Resort) unintimidating slopes, Old West fun park and Pitchfork Terrain Garden beginners’ park are a few things that make it a hit with families. Within its boundaries are 105 trails, four terrain parks, a racing course and 35,000 acres of snowcat skiing and snowboarding."
    },
    {
        'name': 'SILVERTON MOUNTAIN',
        'image': 'https://images.prismic.io/snowpak/5310ef0d-5061-489b-9806-060d283e974e_silverton-map.jpg?auto=compress%2Cformat&rect=0%2C0%2C2000%2C1031&w=1920&fit=max',
        'description': "As Silverton’s motto proclaims, this southwest Colorado ski area is “All thrills, no frills.” Colorado’s highest and steepest ski mountain serves up un-groomed, no-easy-way-down expert terrain for those who prefer skiing the old-school way."
    },
    {
        'name': 'SKI COOPER',
        'image': 'https://res.cloudinary.com/liftopia/image/upload/c_fit,d_defaults:default_logo_1.png,f_auto,h_800,q_auto,w_800/v1/production/trail_maps/2709d5742fd3fbae7ea6ffc4e0795d42.jpg',
        'description': "Ski Cooper is famous for being the former training site for the 10th Mountain Division, the legendary World War II ski troops. Its sweeping runs follow some of the same paths used by the soldiers who skied Europe’s mountain battlefields. Today, it’s popular with families looking for a cheerful and low-stress skiing holiday."
    },
    {
        'name': 'SNOWMASS',
        'image': 'https://res.cloudinary.com/liftopia/image/upload/c_fit,d_defaults:default_logo_1.png,f_auto,h_800,q_auto,w_800/v1/production/trail_maps/5d7b5f6851c1b5715b1e6c84446dce08.jpg',
        'description': "The mountain itself is enormous. Snowmass trumpets that 36 Disneylands could fit within its boundaries. At 4,406 feet, “Snowmassive” also has one of the highest vertical rise of any ski area in the country, and runner-up for Colorado’s longest run — a staggering 5.3 miles of peaceful schussing before you even have to think about the lift line."
    },
    {
        'name': 'STEAMBOAT',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/steamboat/20181217173518/large.jpg',
        'description': "Steamboat feels so confident about the special-ness of its powder, it trademarked it so you’d know just where to find the genuine article: Champagne Powder®. It’s light, it’s dry, it’s smooth and it’s only found in this 112-year-old western town. Despite its size — six breathtaking peaks and 3,000 acres — Steamboat still manages to stay true to its friendly, down-home roots."
    },
    {
        'name': 'SUNLIGHT MOUNTAIN RESORT',
        'image': 'https://sunlightmtn.com/images/2022/10/06/sunlight_trailmap_2022_final_web.jpg',
        'description': "Affordability, friendliness and a mix of terrain are Sunlight’s hallmarks. Hundreds of acres of mild greens, intermediate slopes and black-diamond extremes satisfy all abilities. The slope’s proximity to the world’s largest hot springs pool at Glenwood Hot Springs lets you reward your ski muscles’ big day with a long soak."
    },
    {
        'name': 'TELLURIDE',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/telluride/20181004155715/large.jpg',
        'description': "Driving into the authentic, Victorian-era town of Telluride, it’s hard to imagine 2,000 hundred acres of ski terrain and towering, glossy, modern resort amenities are moments away. That’s because it’s all hidden behind a soaring mountain ridge. A quick gondola ride ferries you to everything from refined, groomed runs to challenging moguls to freestyle parks."
    },
    {
        'name': 'VAIL',
        'image': 'https://dam-assets.vailresorts.com/is/image/vailresorts/22248-Vail-Winter22-23-MAP-And-Sponsors-TMobile-R2-FrontSide?wid=4000&hei=2467&resMode=sharp2',
        'description': "Vail sets the standard for ski resorts in North America, and the bar is only getting higher. With its famed seven back bowls, 193 trails and a staggering 5,289 skiable acres, it’s one of the nation’s largest ski areas. Add to that an array of luxury accommodations and residences, shopping and dining, and endless off-slope activities."
    },
    {
        'name': 'WINTER PARK',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/winter-park-resort/20150210135755/large.jpg',
        'description': "Winter Park proudly boasts award-winning diverse terrain, deep snow, friendly employees and top-notch lodging and dining options. If you’re looking for a bumpy ride, Winter Park is your destination. Skiing Magazine rated Mary Jane (one of the park’s three peaks) No. 1 in North America for mogul skiing. "
    },
    {
        'name': 'WOLF CREEK SKI AREA',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/wolf-creek-ski-area/20200114155606/large.jpg',
        'description': "Wolf Creek Ski Area is famous for getting the most snow of any resort in Colorado — an astounding annual average of 430 inches. So if you like floating through powder, this is your destination. Wolf Pups ski school is the ideal way to ensure the kids become lifelong powder lovers."
    }
];

const ikonMountains = [
    {
        'name': 'ARAPAHOE BASIN',
        'image': 'https://myskisearch.com/wp-content/uploads/Araphahoe-Basin-Ski-Area-Trail-Map.png',
        'description': 'Best known for having one of the longest ski seasons in North America (often from mid-October to early June), A-Basin also boasts North America’s highest elevation terrain park and its own “beach,” the infamous early-riser parking lot, which serves as home base for concerts, parties and tailgating.'
    },
    {
        'name': 'ASPEN HIGHLANDS',
        'image': 'https://res.cloudinary.com/liftopia/image/upload/c_fit,d_defaults:default_logo_1.png,f_auto,h_800,q_auto,w_800/v1/production/trail_maps/835b7f313bb133afa7da31c1209d9728.jpg',
        'description': 'When new snow at Aspen Highlands reaches mammoth proportions, you’re in for a epic day of Colorado’s signature light-and-dry powder. Insiders at the ski area recommend studying the trail map to find hidden gems that drop into gladed, untouched expert areas.'
    },
    {
        'name': 'COPPER MOUNTAIN',
        'image': 'https://www.coppervacations.com/sites/default/files/uploads/copper_mountain_frontside_skiing_trail_map.jpeg',
        'description': 'People who ski and ride Copper love to tout its perfect layout. They have Mother Nature to thank for arranging its slopes so adeptly: Beginner, intermediate and expert runs are each clustered with like-leveled terrain, ensuring beginners won’t make a surprise trip to the top of a steep, mogul-laden run.'
    },
    {
        'name': 'ELDORA MOUNTAIN RESORT',
        'image': 'https://s3.onthesnow.com/images/trailmaps/salt-lake-city/eldora-mountain-resort/20190212183827/large.jpg',
        'description': `Eldora’s proximity to Boulder and Denver is one of the reasons it’s known as a “locals’ mountain.” The fact that they have terrain to keep the whole family busy all day doesn’t hurt either. The Eldora Nordic Center features a network of nearly 25 miles of peaceful cross-country ski and snowshoe trails just steps from the downhill ski area.`
    },
    {
        'name': 'SNOWMASS',
        'image': 'https://res.cloudinary.com/liftopia/image/upload/c_fit,d_defaults:default_logo_1.png,f_auto,h_800,q_auto,w_800/v1/production/trail_maps/5d7b5f6851c1b5715b1e6c84446dce08.jpg',
        'description': "The mountain itself is enormous. Snowmass trumpets that 36 Disneylands could fit within its boundaries. At 4,406 feet, “Snowmassive” also has one of the highest vertical rise of any ski area in the country, and runner-up for Colorado’s longest run — a staggering 5.3 miles of peaceful schussing before you even have to think about the lift line."
    },
    {
        'name': 'STEAMBOAT',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/steamboat/20181217173518/large.jpg',
        'description': "Steamboat feels so confident about the special-ness of its powder, it trademarked it so you’d know just where to find the genuine article: Champagne Powder®. It’s light, it’s dry, it’s smooth and it’s only found in this 112-year-old western town. Despite its size — six breathtaking peaks and 3,000 acres — Steamboat still manages to stay true to its friendly, down-home roots."
    },
    {
        'name': 'WINTER PARK',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/winter-park-resort/20150210135755/large.jpg',
        'description': "Winter Park proudly boasts award-winning diverse terrain, deep snow, friendly employees and top-notch lodging and dining options. If you’re looking for a bumpy ride, Winter Park is your destination. Skiing Magazine rated Mary Jane (one of the park’s three peaks) No. 1 in North America for mogul skiing. "
    }
];

const epicMountains = [
    {
        'name': 'BEAVER CREEK RESORT',
        'image': 'https://files.skimap.org/g7h3ja29nc7c60g5dquqp6damw5x',
        'description': 'Beaver Creek charms with fantastic extras: Heated moving walkways, fresh-baked cookies, a first-tracks program for early risers, a white-carpet club, wine-and-snowshoe excursions and acres of corduroy and powder waiting for skiers and riders to swish through. '
    },
    {
        'name': 'BRECKENRIDGE SKI RESORT',
        'image': 'https://www.visitbreck.com/sites/default/files/uploads/trail_maps_1.jpg',
        'description': 'Breckenridge is one of North America’s most popular resorts, in part because of its variety of terrain: long groomed trails, monster mogul runs, steep chutes, glades and plenty of family-friendly beginner areas. The resort was also one of the first to allow snowboarding on its slopes, and its Freeway Terrain Park is arguably one of the best in North America.'
    },
    {
        'name': 'CRESTED BUTTE MOUNTAIN RESORT',
        'image': 'https://cdn.ski/UjqutMyKAtDVRmbK.jpeg',
        'description': 'Crested Butte has it all: wide-open green and blue trails, expert bowls and plenty of unexplored lines and uncrowded slopes. One thing to really take advantage of, however, is the CB Backcountry Guide. Professional instructors teach would-be backcountry enthusiasts how to navigate safely and explore untouched powder.'
    },
    {
        'name': 'KEYSTONE',
        'image': 'https://s3.onthesnow.com/images/trailmaps/colorado/keystone/20161208212713/large.jpg',
        'description': 'Keystone boasts three mountains full of bowls, steeps, trails, a lift-served tubing hill and one of the state’s longest ski days. Skiers can watch the sun set at 11,000 feet and ski into the night. After a day on the slopes, a moonlight gondola ride takes you to the top of North Peak for a romantic dinner at Alpenglow Stube.'
    },
    {
        'name': 'VAIL',
        'image': 'https://dam-assets.vailresorts.com/is/image/vailresorts/22248-Vail-Winter22-23-MAP-And-Sponsors-TMobile-R2-FrontSide?wid=4000&hei=2467&resMode=sharp2',
        'description': "Vail sets the standard for ski resorts in North America, and the bar is only getting higher. With its famed seven back bowls, 193 trails and a staggering 5,289 skiable acres, it’s one of the nation’s largest ski areas. Add to that an array of luxury accommodations and residences, shopping and dining, and endless off-slope activities."
    }
];

// Below makes and sets the header on each page

$(document).ready(function() {
    function createHeader() {
        return `<nav class="navbar navbar-expand-lg bg-body-secondary text-bg-info p-3">
        <div class="container-fluid">
            <button class="navbar-toggler ml-auto float-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Which Mountain</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="all-mountains.html">All Mountains</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Search by Pass
                        </a>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="ikon.html">Ikon Mountains</a></li>
                          <li><a class="dropdown-item" href="epic.html">Epic Mountains</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
    };
    // Below takes the html above and appends it to the div with the id of 'header'
    const header = $('#header');
    header.append(createHeader());
});

// Below makes the cards for the all mountains page and appends them to the page
// with data from the mountains array

$(document).ready(function() {
    // Function to create and return a card div element using jQuery and Bootstrap
    function createCard(data) {
      return `<div class="card col-sm-4 mb-3" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="${data.name} Trail Map">
                <div class="card-body">
                  <h5 class="card-title">${data.name}</h5>
                  <p class="card-text">${data.description}</p>
                  <a id="${data.name}" href="../conditions.html" class="btn btn-primary">View Weather</a>
                  </div>
              </div>`;
    }
    // The data.name in the id of the anchor tag I am not sure if it will work.  I am trying to make the
    // id be the name of whatever mountain button is clicked so that I can make that be the new city name
    // to input in the getLatLon function below and the weather page will show the correct mountain's weather

    // Loop through the card data and append cards to the container div for all mountains page
    const allMountainsCardContainer = $('#all-mountains-card-container');
    const ikonMountainsCardContainer = $('#ikon-mountains-card-container');
    const epicMountainsCardContainer = $('#epic-mountains-card-container');
    mountains.forEach(function(data) {
      allMountainsCardContainer.append(createCard(data));
    });
    ikonMountains.forEach(function(data) {
        ikonMountainsCardContainer.append(createCard(data));
    });
    epicMountains.forEach(function(data) {
        epicMountainsCardContainer.append(createCard(data));
    })

    // The below creates the weather conditions page for each mountain and applies
    // each mountains conditions based on which one was selected.
    function createPage(data) {
        return `<div class="col-9 red vh-100">
        <div id="current-weather">
          <h3><span id="city"></span> <span id="date"></span> <img src="" id="todays-icon"></h3>
          <p id="todays-temp">Temp: </p>
          <p id="todays-wind">Wind: </p>
          <p id="todays-humidity">Humidity: </p>
        </div>

        <div id="five-day-forecast">
          <div>
            <h3>Five Day Forecast:</h3>
          </div>

          <div class="forecast-days">
            <div class="forecast-day" id="day1">
              <p id="d1date">Today's Date</p>
              <img src="" id="d1weathericon">
              <p id="d1temp">Temp: </p>
              <p id="d1wind">Wind: </p>
              <p id="d1humidity">Humidity: </p>
            </div>

            <div class="forecast-day" id="day2">
              <p id="d2date">Today's Date</p>
              <img src="" id="d2weathericon">
              <p id="d2temp">Temp: </p>
              <p id="d2wind">Wind: </p>
              <p id="d2humidity">Humidity: </p>
            </div>

            <div class="forecast-day" id="day3">
              <p id="d3date">Today's Date</p>
              <img src="" id="d3weathericon">
              <p id="d3temp">Temp: </p>
              <p id="d3wind">Wind: </p>
              <p id="d3humidity">Humidity: </p>
            </div>

            <div class="forecast-day" id="day4">
              <p id="d4date">Today's Date</p>
              <img src="" id="d4weathericon">
              <p id="d4temp">Temp: </p>
              <p id="d4wind">Wind: </p>
              <p id="d4humidity">Humidity: </p>
            </div>

            <div class="forecast-day" id="day5">
              <p id="d5date">Today's Date</p>
              <img src="" id="d5weathericon">
              <p id="d5temp">Temp: </p>
              <p id="d5wind">Wind: </p>
              <p id="d5humidity">Humidity: </p>
            </div>
          </div>
        </div>
      </div>`;
    }

    const conditionsPage = $('#conditions');
    conditionsPage.append(createPage());
  });



// Below fetches the weatherapi data
function getWeather(requestUrl) {
    fetch(requestUrl).then(function(response) {
        if(response.status !== 200) {
            console.log('Status Error');
        } else {
            return response.json();
        }
    }).then(function(data) {
        let todaysHumidity = data.list[0].main.humidity;
        let todaysTemp =  kelvinToFahrenheit(data.list[0].main.temp);
        let todaysWind = data.list[0].wind.speed;
        let todaysIcon = data.list[0].weather[0].icon;
        let todaysIconUrl = 'https://openweathermap.org/img/wn/' + todaysIcon + '.png'
        $('#todays-humidity').text('Humidity: ' + todaysHumidity + '%');
        $('#todays-temp').text('Temp: ' + todaysTemp + ' F');
        $('#todays-wind').text('Wind: ' + todaysWind + 'MPH');
        $('#todays-icon').attr('src', todaysIconUrl);
        $('#city').text('Aspen Mountain');
        $('#date').text(dayjs().format('(MM/DD/YYYY)'))
    })
}

// ADD SNOW AND CAN TAKE AWAY HUMIDITY OR SOMETHING*********************

// Below fetches the five day forecase from the weather api

function getForecast(requestForecastUrl) {
    fetch(requestForecastUrl).then(function(response) {
        if(response.status != 200) {
            console.log('Status Error')
        } else {
            return response.json();
        }
    }).then(function(data) {
        const dayOneHumidity = data.list[1].main.humidity;
        const dayTwoHumidity = data.list[2].main.humidity;
        const dayThreeHumidity = data.list[3].main.humidity;
        const dayFourHumidity = data.list[4].main.humidity;
        const dayFiveHumidity = data.list[5].main.humidity;
        //Above is day 1-5 of forecast's humidity

        const dayOneTemp =  kelvinToFahrenheit(data.list[1].main.temp);
        const dayTwoTemp =  kelvinToFahrenheit(data.list[2].main.temp);
        const dayThreeTemp =  kelvinToFahrenheit(data.list[3].main.temp);
        const dayFourTemp =  kelvinToFahrenheit(data.list[4].main.temp);
        const dayFiveTemp =  kelvinToFahrenheit(data.list[5].main.temp);
        //Above is day 1-5 of forecast's temperature

        const dayOneWind = data.list[1].wind.speed;
        const dayTwoWind = data.list[2].wind.speed;
        const dayThreeWind = data.list[3].wind.speed;
        const dayFourWind = data.list[4].wind.speed;
        const dayFiveWind = data.list[5].wind.speed;
        //Above is day 1-5 of forecast's wind speed

        const dayOneIcon = data.list[1].weather[0].icon;
        const dayTwoIcon = data.list[2].weather[0].icon;
        const dayThreeIcon = data.list[3].weather[0].icon;
        const dayFourIcon = data.list[4].weather[0].icon;
        const dayFiveIcon = data.list[5].weather[0].icon;
        //Above is day 1-5 of forecast's weather icons

        const dayOneIconUrl = 'https://openweathermap.org/img/wn/' + dayOneIcon + '.png'
        const dayTwoIconUrl = 'https://openweathermap.org/img/wn/' + dayTwoIcon + '.png'
        const dayThreeIconUrl = 'https://openweathermap.org/img/wn/' + dayThreeIcon + '.png'
        const dayFourIconUrl = 'https://openweathermap.org/img/wn/' + dayFourIcon + '.png'
        const dayFiveIconUrl = 'https://openweathermap.org/img/wn/' + dayFiveIcon + '.png'

        $('#d1weathericon').attr('src', dayOneIconUrl);
        $('#d2weathericon').attr('src', dayTwoIconUrl);
        $('#d3weathericon').attr('src', dayThreeIconUrl);
        $('#d4weathericon').attr('src', dayFourIconUrl);
        $('#d5weathericon').attr('src', dayFiveIconUrl);

        $('#d1humidity').text('Humidity: ' + dayOneHumidity + '%');
        $('#d2humidity').text('Humidity: ' + dayTwoHumidity + '%');
        $('#d3humidity').text('Humidity: ' + dayThreeHumidity + '%');
        $('#d4humidity').text('Humidity: ' + dayFourHumidity + '%');
        $('#d5humidity').text('Humidity: ' + dayFiveHumidity + '%');
        //Above sets the html for day 1-5 humidity

        $('#d1temp').text('Temp: ' + dayOneTemp + ' F');
        $('#d2temp').text('Temp: ' + dayTwoTemp + ' F');
        $('#d3temp').text('Temp: ' + dayThreeTemp + ' F');
        $('#d4temp').text('Temp: ' + dayFourTemp + ' F');
        $('#d5temp').text('Temp: ' + dayFiveTemp + ' F');
        //Above sets the html for day 1-5 temperature

        $('#d1wind').text('Wind: ' + dayOneWind + 'MPH');
        $('#d2wind').text('Wind: ' + dayTwoWind + 'MPH');
        $('#d3wind').text('Wind: ' + dayThreeWind + 'MPH');
        $('#d4wind').text('Wind: ' + dayFourWind + 'MPH');
        $('#d5wind').text('Wind: ' + dayFiveWind + 'MPH');
        //Above sets the html for day 1-5 wind speed

        $('#d1weathericon').text(dayOneIcon);
        $('#d2weathericon').text(dayTwoIcon);
        $('#d3weathericon').text(dayThreeIcon);
        $('#d4weathericon').text(dayFourIcon);
        $('#d5weathericon').text(dayFiveIcon);
        //Above sets the html for day 1-5 icon

        $('#d1date').text(dayOneDate);
        $('#d2date').text(dayTwoDate);
        $('#d3date').text(dayThreeDate);
        $('#d4date').text(dayFourDate);
        $('#d5date').text(dayFiveDate);
        //Above sets the html for day 1-5 date
    })
}

//The request city url function will take the user's input city and get the lattitude and longitude of that 
//city from the api request.  It will then pass those lat and lon into the weatherUrl parameters to then
//fetch the weather from that city by calling the getWeather function.
function getLatLon(requestCityUrl) { 
    fetch(requestCityUrl).then(function(response) {
        if(response.status != 200) {
            console.log('Status Error')
        } else {
            return response.json();
        }
    }).then(function(data) {
        //The below saves the lat and lon from the api request so we can pass them into the parameters
        //of the weatherUrl so that we can then request the weather of that city the user input.
        lat = data[0].lat;
        lon = data[0].lon;
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

        //Below calls the getWeather function, that is created further down, inside the getLatLon function.
        getWeather(weatherUrl);
        getForecast(forecastUrl);
        // Add the above when we start needing forecasts
    })
};

// Below takes which button was selected and inputs which city's weather should be shown.
// NEED TO MAKE THIS FUNCTIONAL FOR EACH CITY WHEN THAT MOUNTAIN'S BUTTON IS CLICKED***************
function inputResults() {
    let inputValue = $(`#${mountains.name}`);
    cityName = inputValue.toString();
    weatherUrlByCity = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    cityEl.text(cityName);
}

inputResults();
getLatLon(weatherUrlByCity);

// submitButton.addEventListener('click', function(event) {
//     event.preventDefault();

//     inputResults();
//     getLatLon(weatherUrlByCity);
// })


// The function below takes the weather in kelvin and turns it into fahrenheit
function kelvinToFahrenheit(kelvin) {
    var fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
    return fahrenheit;
  }

// The below event listeners make the navbar links functional

ikonEl.on('click', function() {
    location.href = '/ikon.html'
});

allMountainEl.on('click', function() {
    location.href = '/all-mountains.html'
});

epicEl.on('click', function() {
    location.href = '/epic.html'
});

