/*#########################################################################
#                                                                         #
#   A simple script that lists BBC Radio streams in Amarok.               #
#   Adapted from Cool Streams.                                            #
#                                                                         #
#   Stream adresses manually discovered by following links on             #
#      http://bbcstreams.com/                                             #
#   and playing each link with vlc -vv and reading the output.            #
#   Stream adresses manually discovered by following links on             #
#      http://www.radiofeeds.co.uk/query.asp?feedme=bbc                   #                          #
#   got the links from the aacPlus/AAC section                            #
#   Copyright                                                             #
#   (C)       2012 Alin M Elena <alinm.elena@gmail.com>                   #
#   (C)       2012 Jacopo Nespolo <j.nespolo@gmail.com>                   #
#   (C) 2007, 2008 Nikolaj Hald Nielsen  <nhnFreespirit@gmail.com>        #
#   (C)       2008 Peter ZHOU <peterzhoulei@gmail.com>                    #
#   (C)       2008 Mark Kretschmann <kretschmann@kde.org>                 #
#                                                                         #
#   This program is free software; you can redistribute it and/or modify  #
#   it under the terms of the GNU General Public License as published by  #
#   the Free Software Foundation; either version 2 of the License, or     #
#   (at your option) any later version.                                   #
#                                                                         #
#   This program is distributed in the hope that it will be useful,       #
#   but WITHOUT ANY WARRANTY; without even the implied warranty of        #
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         #
#   GNU General Public License for more details.                          #
#                                                                         #
#   You should have received a copy of the GNU General Public License     #
#   along with this program; if not, write to the                         #
#   Free Software Foundation, Inc.,                                       #
#   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.         #
##########################################################################*/

function Station( name, url )
{
    this.name = name;
    this.url = url;
}

var stationArray = new Array (

    new Station( "Radio Swiss Classic","http://www.radiosvizzeraclassica.ch/live/mp3.m3u"),
    new Station( "Radio Swiss Jazz","http://www.radioswissjazz.ch/live/mp3.m3u"),

    // INTERNATIONAL STATIONS
    new Station( "BBC World Service","http://lbw2.flash.streamuk.com/_bbc/ch2.stream/playlist.m3u8"),

    // Italian streams
    new Station("Radio Radicale","http://livemp3.radioradicale.it/live.mp3"),
);

function BBCRadioStreams()
{
    ScriptableServiceScript.call( this, "Nice Radio Streams", 1, "List of Nice Radio Streams", "List of Nice Radio Streams", false );
}

function onPopulating( level, callbackData, filter )
{
    Amarok.debug( " Populating station level..." );
    //add the station streams as leaf nodes
    if (level == 0)
    {
      for ( i = 0; i < stationArray.length; i++ )
      {
        item = Amarok.StreamItem;
        item.level = 0;
        item.callbackData = "";
        item.itemName = stationArray[i].name;
        item.playableUrl = stationArray[i].url;
        item.artist="BBC"
        item.album="BBC Radio Live"
        item.track=item.itemName;
        item.infoHtml = "A cool stream called " + item.itemName;
        script.insertItem( item );
      }
    }
    script.donePopulating();
}

script = new BBCRadioStreams();
script.populate.connect( onPopulating );
