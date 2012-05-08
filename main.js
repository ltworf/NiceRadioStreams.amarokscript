/*#########################################################################
#                                                                         #
#   A simple script that lists BBC Radio streams in Amarok.               #
#   Adapted from Cool Streams.                                            #
#                                                                         #
#   Stream adresses manually discovered by following links on             #
#      http://bbcstreams.com/                                             #
#   and playing each link with vlc -vv and reading the output.            #
#                                                                         #
#   Copyright                                                             #
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

    new Station( "BBC Radio 1",                 "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio1/radio1_bb_live_int_ep1_sl0?BBC-UID=34affa39b0860ca3c5aeb1dee1e3a7fe09186129c0600141a242030344f4f5f5&amp;SSO2-UID="),
    new Station( "BBC Radio 1xtra",             "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/1xtra/1xtra_bb_live_int_ep1_sl0?BBC-UID=14bf9ae9a0d7071be91085bfb1eb0647f47851f8205031316272c3f3e454f5a5&amp;SSO2-UID="),
    new Station( "BBC Radio 2",                 "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio2/radio2_bb_live_int_ep1_sl0?BBC-UID=24df6a796007cb94a6731fdc8172f1b17d32049b50b031a1027273039404f575&amp;SSO2-UID="),
    new Station( "BBC Radio 3",                 "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio3/radio3_bb_live_int_ep1_sl0?BBC-UID=046f8a1910b87626a668c52561b2210b54d2edce4020619132c2c353c434f535&amp;SSO2-UID="),
    new Station( "BBC Radio 4",                 "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio4/radio4_bb_live_int_ep1_sl1?BBC-UID=349f2a8950b8590f46693b4931fbaa77c62597e350e0c1b132c293a344443525&amp;SSO2-UID="),
    new Station( "BBC Radio 4xtra",             "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio4/radio4xtra_bb_live_int_ep1_sl0?BBC-UID=349f1a29608acac0322be44911415fe469718e0e90200134a49f6957fc327a51&amp;SSO2-UID="),
    new Station( "BBC Radio 4LW - Long Wave",           "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio4/radio4lw_bb_live_int_ep1_sl0?BBC-UID=649f0ab920a9f5e5b97baead614587425dc1d24300809161a2a203f3a46455b5&amp;SSO2-UID="),
    new Station( "BBC Radio 5 - Live",              "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio5/radio5_bb_live_int_ep1_sl0?BBC-UID=145f1a1940597a02b9cd0da321a690a98f8686dbe0d071416292a3e364340525&amp;SSO2-UID="),
    new Station( "BBC Radio 5LSP - Live Sports Extra",      "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/radio5/5spxtra_bb_live_int_ep1_sl0?BBC-UID=b45f4a3910da1172a7822cb801f3e72b52a8fdb8f0b011a1b212f38354643575&amp;SSO2-UID="),
    new Station( "BBC Radio 6 - Music",                     "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/6music/6music_bb_live_int_ep1_sl0?BBC-UID=44ef7a985fffb2f3d24e1797c1a16fc8be29762a006031b14262a3e32424e585&amp;SSO2-UID=" ),
    new Station( "BBC Asian Network",               "mms://wmlive-nonacl.bbc.net.uk/wms/bbc_ami/asiannet/asiannet_bb_live_int_ep1_sl0?BBC-UID=640fca89f0ea3e446ab54abcb1a1cd4382bdc5f040e0617192e2f3d3249495a5&amp;SSO2-UID="),
    // INTERNATIONAL STATIONS
    new Station( "BBC World Service",               "mmsh://livewmstream-ws.bbc.co.uk.edgestreams.net/reflector:43021?&MSWMExt=.asf"),
    new Station( "BBC World Service (UK Schedule)",     "mms://a243.l3944038972.c39440.g.lm.akamaistream.net/D/243/39440/v0001/reflector:38972")


);

function BBCRadioStreams()
{
    ScriptableServiceScript.call( this, "BBC Radio Streams", 1, "List of BBC Radio Streams", "List of BBC Radio Streams", false );
}

function onPopulating( level, callbackData, filter )
{
    Amarok.debug( " Populating station level..." );
    //add the station streams as leaf nodes
    for ( i = 0; i < stationArray.length; i++ )
    {
        item = Amarok.StreamItem;
        item.level = 0;
        item.callbackData = "";
        item.itemName = stationArray[i].name;
        item.playableUrl = stationArray[i].url;
        item.infoHtml = "A cool stream called " + item.itemName;
        script.insertItem( item );
    }
    script.donePopulating();
}

script = new BBCRadioStreams();
script.populate.connect( onPopulating );
