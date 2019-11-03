# This Is Halloween #

A Halloween-themed side-scroller shooter game built in JavaScript, using PixiJS. Pretty much the same as
[shooter-game](https://github.com/dgyarmati/shooter-game), but with different sprites and some sounds, plus a boss fight!

**How to run locally**

Just clone/download the repo, and open `bin/index.html`.

If it complains about the CORS of the images, you'll probably either need to run it from an IDE, or spin 
up a simple web server. The easiest way to do this is probably using Python. A detailed instruction can be found 
[here](http://duspviz.mit.edu/tutorials/localhost-servers/#python-simple-server), but it boils down to this:

1. [Install Python 2.7](https://www.python.org/downloads/) if you don't have it already
2. open a terminal, and navigate to downloaded folder (`shooter-game` by default)
3. run `python -m SimpleHTTPServer`
4. open your browser of choice, and navigate to the displayed URL (normally `http://localhost:8000/`)
5. navigate to the `/bin` folder (or skip the previous step, and navigate directly to `http://localhost:8000/bin/`)
6. have fun!
   
**Controls**
 
SPACE to shoot, arrow keys to move.

I used most of the sprites and some of the logic from [this project](https://github.com/Karzam/Spaceship_Tutorial_Part_1).
