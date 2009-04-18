<!DOCTYPE html>
<!--
  Searchmarks
  Copyright (c) 2009 D. M. Deller
  
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.
  
  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<html>

  <head>
  
    <title>Searchmarks</title>
    
    <link rel="stylesheet" type="text/css" href="style.css" />
    
    <script type="text/javascript" src="scriptaculous/prototype.js"></script>
    <script type="text/javascript" src="scriptaculous/scriptaculous.js"></script>
    <script type="text/javascript" src="searchmarks.js"></script>
    
  </head>
  
  <body onLoad="Searchmarks.init();">
  
    <h1>Searchmarks</h1>

    <div id="search">
    
      <form>
      
        <select id="engines_list">
        </select>
        
        <input type="text" size="50" />
        
        <input type="submit" value="Search" />
      
      </form>
      
      <br />
      
      <ul>
        <li><a href="javascript:void(0);" onClick="Searchmarks.UI.addEngine();">Add search engine</a></li>
        <li><a href="javascript:void(0);" onClick="Searchmarks.UI.editEngines();">Edit search engines</a></li>
        <li><a href="javascript:void(0);" onClick="Searchmarks.UI.reset();">Reset</a></li>
      </ul>
    
    </div>
    
    <ul id="notifications"></ul>

  </body>

</html>
