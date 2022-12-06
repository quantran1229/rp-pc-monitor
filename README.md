# Raspberry Pi PC monitor
Raspberry Pi as PC monitor and shortcut for app.

Raspberry Pi will use 3.5 inch display.

There will be 2 parts:
- API run on windows
- Monitor run on Raspberry

## API
API is running with nodejs + fastify framework.

## FE monitor
FE using ReactJS + Ant design.

## How to run
Start with run server on your pc.

Update env of FE field `REACT_APP_API_URL` to your pc local id address.

Build html file in FE side:
```
yarn run build
```

After having `/build` folder => copy to your Raspberry Pi.

Update startup file in raspberry Pi
```
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

Copy this into file:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --start-fullscreen file:///${path to your index.html file}
```

Restart Raspberry Pi.