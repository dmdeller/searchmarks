/*
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
*/

Searchmarks = {

  init : function()
  {
    try
    {
      db = openDatabase("Searchmarks", "0001", "Searchmarks data", (5*1024*1024));
      if (!db)
        this.UI.addError("Unable to open the database. Your browser says it supports this feature, but the request was denied. Maybe disk space is full, or maybe you have this feature turned off. Try looking in Preferences.");
      else
      {
        this.createTables();
        this.populateEngines();
      }
    }
    catch(err)
    {
      this.UI.addError("Your browser doesn't support <a href=\"http://www.w3.org/TR/offline-webapps/#sql\">Offline Databases</a>. Searchmarks won't be able to remember any changes you make. Try using a recent version of Safari, or nag your browser vendor to support this feature.<br /><br />Your browser said: "+err);
    }
  },
  
  createTables : function()
  {
    db.transaction(function(tx)
      {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Engines(name TEXT, home_url TEXT, search_url TEXT)',
          [],
          null,
          function(tx,error) { Searchmarks.addErrorFromSql(error.message); }
        );
      }
    );
  },
  
  dropDatabase : function()
  {
    db.transaction(function(tx)
      {
        tx.executeSql(
          'DROP TABLE IF EXISTS Engines',
          [],
          null,
          function(tx,error) { Searchmarks.addErrorFromSql(error.message); }
        );
      }
    );
  },
  
  populateEngines : function()
  {
    for(var i = 0; i < $('engines_list').childNodes.length; i++)
    {
      $('engines_list').removeChild($('engines_list').childNodes[i]);
    }
    
    db.transaction(function(tx)
      {
        tx.executeSql('SELECT * FROM Engines',
          [],
          function(tx, rs)
          {
            for(var i = 0; i < rs.rows.length; i++)
            {
              var row = rs.rows.item(i);
              
              var option = document.createElement('option');
              option.value = row['search_url'];
              option.innerHTML = row['name'];
              
              $('engines_list').appendChild(option);
            }
          },
          function(tx,error) { Searchmarks.addErrorFromSql(error.message); }
        );
      }
    );
  },
  
  addEngine : function(name, search_url)
  {
    db.transaction(function(tx)
      {
        tx.executeSql('INSERT INTO Engines (name, search_url) VALUES (?, ?)',
          [name, search_url],
          function(tx, rs)
          {
          },
          function(tx,error) { Searchmarks.addErrorFromSql(error.message); }
        );
      }
    );
  },
  
  addErrorFromSql : function(message)
  {
    this.UI.addError('An SQL error occurred: '+message);
  },
  
  UI : {
  
    addNotification : function(type, message)
    {
      var li = document.createElement('li');
      li.className = type;
      li.innerHTML = message;
      li.hide();
      $('notifications').appendChild(li);
      new Effect.BlindDown(li);
    },
    
    addMessage : function(message)
    {
      this.addNotification('message', message);
    },
    
    addError : function(message)
    {
      this.addNotification('error', message);
    },
  
    addEngine : function()
    {
      var name = prompt('Search engine name:');
      var search_url = prompt('Search URL:');
      
      Searchmarks.addEngine(name, search_url);
      Searchmarks.populateEngines();
    },
    
    editEngines : function()
    {
      alert('Not yet implemented');
    },
    
    reset : function()
    {
      var consent = confirm("Are you sure? You will lose everything. Your girlfriend/boyfriend will leave you. Your bank will repossess your cat.");
      
      if (consent)
      {
        Searchmarks.dropDatabase();
        Searchmarks.init();
        
        this.addMessage('Searchmarks was reset.');
      }
    }
  
  }
}
