# DoYou?

Unofficial app for https://doyou.world/ , built with React Native, AirTime Pro's API & a lot of coffee.

Feel free to create issues [here](https://github.com/Jojocaster/do-you-app/issues) to report bugs / suggest features, I'll do my best to get back to you asap.

## Releases (Android)
- Beta 0.2.2: [Download link](https://github.com/Jojocaster/do-you-app/releases/download/v0.2.2/a0a4ea6f-8afe-4995-85fb-1686f9b50878-9ff2763ce3b94445894895eb25765993.apk)
```
Changelog: 

- Fix for player. It would sometimes lose the current track when the app was idle in the background for too long. 
```

- Beta 0.2.1: [Download link](https://github.com/Jojocaster/do-you-app/releases/download/v0.2.1/bc0cbc31-cd68-4fa7-b95c-5b22689e35c4-b5212c5713e249a0abc2a4431559d084.apk)
```
Changelog: 

- Current show / track logic improved
- Current show now highlighted in schedule
- Schedule now supports different timezones
- Code cleaned up and improved
```

- Beta 0.2.0: [Download link](https://github.com/Jojocaster/do-you-app/releases/download/v0.2.0/44fb928c-12a5-4d20-bcc9-1b8aae1c02c7-39a1768725d54e5ba882c932e7b5dcf3.apk)
```
Changelog: 

- Notifications can now be sent when a show is live and can be turned on & off from the Settings.
- Current show's title grabbed from schedule in case `live-info` doesn't return the right name
- Player controls improved
- Minor fixes 
```

- Beta 0.1.0: [Download link](https://github.com/Jojocaster/do-you-app/releases/download/v0.1.0/b883bc47-bfbb-483e-a960-6439cc2148e6-41c9ea09d631423b8a98bb9c8cf39d0d.apk)

/!\ As this version is still a beta and not on the store just yet, Google may warn you about the app being "unsafe" - that is completely normal. Just "install anyway" and enjoy that perfect sound forever.

## Features
- Live Status tracker, running automatically in the background
- See the list of upcoming shows (according to current timezone)
- Allow radio to be played in the background & controlled from the notification centre & lockscreen
- See today's track IDs (Beta)
- Receive notifications when a show is live
- Chat!

## Screenshots
<p align="center">
<img src="assets/readme/home.jpg" width="150"/>
&nbsp; &nbsp; &nbsp; &nbsp;
<img src="assets/readme/tracks.jpg" width="150"/>
&nbsp; &nbsp; &nbsp; &nbsp;
<img src="assets/readme/controls.jpg" width="150"/>
&nbsp; &nbsp; &nbsp; &nbsp;
<img src="assets/readme/settings.jpg" width="150"/>
</p>

## Roadmap
- <del>Fetch live info in the background to send notifications when shows are live</del>
- 11:11
- <del>Add Settings to manage alerts</del>
- <del>Show correct times according to timezone</del>
- <del>Embed chat</del>
- UI & UX improvements
- Persist state in async store
- iOS release
- Add volume control
- Trigger push notifications from server instead of polling data from client (using `Lambda`, `CRON`, `S3` & `expo-notifications`)
- Load shows from Mixcloud through Redis and display track IDs
- Add "Events" tab
- Handle light theme
- Set alerts for individual shows based on schedule?
- Better error management :)
- Improve test coverage
- Display more information about tracks
- Prevent app from going to sleep is chat is focused
- Open to suggestions, feel free to post them here [here](https://github.com/Jojocaster/do-you-app/issues) :) 
