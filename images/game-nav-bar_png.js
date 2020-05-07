/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAABkCAYAAACCcgK0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDRJREFUeNrsnO9t2kAYhy9RBmCDegO8AUQdoO0CrdMBKiZIaQco6gIl7fcq7QAVdIAqZIAq9HslGKASvRdsZJzzH+AOm+N5pFeJLOODux+/972zD6UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMtOgCsMFIxyKOiO6AXYlSQkoioFtgFx4MYhrSLWDDlXAnsOZKuBPs50qtFu4Ellzp01AtOl3cCfZ0pSBQi38LtfgxMroT60+wnSuJmCQM7tSnu2ArV0rC4E4z3Am2diXcqZlI4TpKxVG4Eu7UPJ4bitijcSXcqTm04m9xE8VUyZWOzZ0uPBVSoOO2AR0u7Yfx+5Fox3/D9EnXb4svop1pGT/HG9cVZ5vomOr4E/8/1zGu68Oe1dDmINOZn3XcWE5twwIhnR1AMHKsW+nF+sy/s/LzREhPLyu/p3lGaOPUMa8YOcr/iRstSsKWgKq0VRpfb4tTXDpeRfu3FztaHzHl09uiM23NEHceUKmRnj1f1UJVhZREcqsl5/7dNtG1PbC+1EymlDaJ7b3nqCYrPkGf8URHO1ylsk5n9bcd7tfwy2gV6fQ31wns/l7nM53UpjruJ6tjJXTrrK+a7Ez9zDWT4rvvyJn6eSnr1932buMqxPne9HKdKbQ9sOee1WNScL6IY+6wnb5p0vD+3cqNGmPX+uv0xTy1uXJRjF847vAqKaKTc+50i1neJO6gmwOO1VVqzWiJpBeZcWlHWA5knSTvxZDuDt1PVti3QBxZErTrRctHxbiuixZ6ul9bepNUm1OgR8eack5FTI0SlNRJvgnp1MTUCEHJsoHh887ihVznuKyZ8qadYWYqP43DVAcdE7XWUFJov756dFgqpkvl4cq3y6WBJjhToUP9fqjFkULlOb6Lydiu1DEuUt4pC+lUxJSku4225d6abTEZiu3ahHSuwBU3qTpqyfdvdhtIbqU0pUZCTO4FtZ5czOfO2/tYZ7GNmNwTJP/IA25WLxw8OtSp84PW8dTA5QkJqVsy+HthuA8Y1PlhcaYDuVLO4O9Nxu2khRZi8pP2xsA7SEIGt6ttSeDC88Ec19x+6DLNLdXaNrY55nvsH+utVrIeVLZmJKvk8jCbPJYrUbSXrmAb1IBu949WepBFHHmCkJXxvCci5XnxIlHJa5X9G+TQwJncepBFLCYhXPerbQ4oElXm9TO63j82dsx8GOwmImW4aZzd1WLYPs5vEXjGID3AiQDEXcRlVPFzXOJqkSr4nUsRUHJNQ4rs0v1+Mco6U0URZYmU+TcT1qIybM7s0f2ezuRU+Q7bMidJtm1VvSa/f+kRQUURRTvMEKuIihmdrzM5CyIyiapsizp47Eyz2FValtsZ4kz+k8zGHhyIqEhUd+pEHtkFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABP+C/AADLwSOOZzil0AAAAAElFTkSuQmCC';
export default image;