// Predetermined feed. Add a post by appending an object to `extra` at the bottom
// (order is randomized on page load).
// Only `src` is required:
//   src      any image/video URL (video detected from .mp4/.webm/.ogv/.mov/.m4v)
//   type     "image" | "video" (only needed if the URL has no file extension)
//   user     display name (default "nancy")
//   caption  text under the post
//   likes    starting like count (default 0)
//   avatar   URL of a profile picture for `user` (default: colored letter circle)
//   poster   thumbnail URL for a video
//   credit   URL for a "credit" link (omit to hide it)
//   priority number; posts with one show first, lowest number on top (1 = very first).
//            Posts without it follow in random order.
//   file     Wikimedia Commons filename; sets `credit` to its file page
// Example:
//   { src: "https://i.imgur.com/abc123.jpg", user: "nancy", caption: "hi", likes: 12 },
//
// The entries below come from Wikimedia Commons (real photos/videos, freely
// licensed); the file page lists the author and license.
const commons = (file, width) =>
  "https://commons.wikimedia.org/wiki/Special:FilePath/" +
  encodeURIComponent(file.replace(/ /g, "_")) +
  (width ? "?width=" + width : "");

const photo = (user, file, caption, likes) => ({
  type: "image", user, file, caption, likes, src: commons(file, 1080),
});
const video = (user, file, caption, likes) => ({
  type: "video", user, file, caption, likes, src: commons(file),
});

const cats = [
  photo("whiskers.daily", "Oriental shorthair kitten.jpg", "Those ears have their own zip code.", 1243),
  video("tuxedo.trio", "Black and tuxedo kittens.webm", "Three tiny menaces, zero chill.", 3871),
  photo("mochi_the_tabby", "Young tabby cat keeping watch.jpg", "On patrol. Nothing gets past me.", 982),
  photo("chartreux.chronicles", "Chartreux-cat-edouard-marie.jpg", "Blue coat, orange eyes, no notes.", 2210),
  video("marmalade.fam", "Three orange kittens following their mother.webm", "Follow the leader.", 5120),
  photo("snowpaws", "Felis catus-cat on snow.jpg", "Snow day. Do not disturb.", 1764),
  photo("gingerbean", "Ginger Kitten.jpg", "Powered by sunshine and mischief.", 2933),
  video("calico.kitten.club", "Calico kitten playing.webm", "Zoomies, take 47.", 4402),
  photo("midnight.mochi", "Black kitten July August 2009-1.jpg", "Void, but make it fluffy.", 1588),
  photo("siberian.sasha", "Siberian black tabby blotched cat 04.jpg", "Fluff level: maximum.", 2047),
  video("burmese.baby", "Burmese Kitten Grooming Itself.webm", "Self-care Sunday.", 3290),
  photo("pocket.tigers", "1-month-old kittens 32.jpg", "One month old and already running the house.", 6012),
  photo("assisi.calico", "Calico cat, - Assisi, Italy.jpg", "Lazy afternoon in Assisi.", 1391),
  video("tokyo.tiny", "Kitten playing - Tokyo - Jan 7 2020.webm", "Pounce practice.", 2678),
  photo("goldie.and.snow", "Golden tabby and white kitten n01.jpg", "Best friends, obviously.", 1856),
  photo("kali.cat", "Kali April 2016-6.jpg", "Caught mid-thought.", 874),
  video("mama.and.babies", "Cat and kittens.webm", "Feeding time chaos.", 2519),
  photo("grandma.whiskers", "Tired 20-year-old cat.jpg", "20 years young. Legend.", 7345),
  photo("sphynx.society", "Sphynx kittens.jpg", "Warm hands wanted.", 1122),
  photo("choco.spots", "Oriental Shorthair kitten chocolate spotted tabby.jpg", "Chocolate spots, extra sweet.", 1670),
];

const puppies = [
  photo("golden.hour.callie", "Callie the golden retriever puppy.jpg", "Callie has entered the chat.", 3104),
  video("doodle.and.lab", "Goldendoodle and Black Lab puppies playing in slow motion.webm", "Slow motion makes it art.", 5318),
  photo("borzoi.beauty", "Borzoi puppy on sofa 0293.jpg", "All legs, no regrets.", 1982),
  photo("spotty.dotty", "Dalmatian puppy 01.jpg", "Spots: loading...", 2476),
  video("lab.and.the.four", "Labrador retriever with her 4 puppies.webm", "Mom is outnumbered.", 4890),
  photo("frenchie.fawn", "French bulldog puppy fawn.jpg", "Those ears are antennas.", 2661),
  photo("choc.lab.diaries", "Labrador Retriever Chocolate puppy 04.jpg", "Chocolate lab, extra sweet.", 1753),
  video("play.fight.club", "Goldendoodle and Black Lab puppies play fighting in slow motion.webm", "Rule one: no biting ears.", 3667),
  photo("corgi.loaf", "Corgi Puppy.jpg", "Stubby legs, huge energy.", 4213),
  photo("collie.at.eight.weeks", "Rough Collie puppy 8 weeks.jpg", "Eight weeks and already majestic.", 2095),
  video("just.a.puppy", "Puppy playing.webm", "Playtime never ends.", 2840),
  photo("rotty.baby", "Rottweiler puppy -21603071920.jpg", "Big paws to grow into.", 1534),
  photo("ulaanbaatar.nap", "Sleeping Puppies in Ulaanbaatar.jpg", "Nap pile.", 3381),
  video("tokyo.pups", "Puppiesplaying-tokyoarea-jan7-2020.webm", "Tokyo puppy pile-up.", 3902),
  photo("staffy.smile", "Staffordshire-bull-terrier-puppy-fawn-2166763.jpg", "Smiling because snacks exist.", 2217),
  photo("husky.mix", "Keeshond Siberian Husky crossbreed puppy.jpg", "Keeshond x husky: floof squared.", 1698),
  video("santa.paws", "Christmas Puppy ctr.webm", "Best present under the tree.", 2955),
];

// Add your own posts here (see the field list above).
const extra = [];

window.POSTS = [...cats, ...puppies, ...extra];
