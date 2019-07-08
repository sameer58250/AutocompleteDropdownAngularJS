angular.module('indexModule')
       .filter('filterTeam', function () {
            return function (items, letter) {
                var filtered = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (letter && item.Team.toUpperCase().indexOf(letter.toUpperCase()) !== -1) {
                        filtered.push(item);
                    }
                }
                return letter ? filtered : items;
            };
        })
       .filter('filterEmployee', function () {
           return function (items, team, letter) {
               var filtered = [];
               var filteredEmp = [];
               if (!team) {
                   angular.forEach(items, function (i) {
                       filtered = filtered.concat(i.Employee);
                   });
               }
               else {
                   angular.forEach(items, function (i) {
                       if (i.Team.toUpperCase() === team.toUpperCase()) {
                           filtered = i.Employee;
                       }
                   });
               }
               if (letter) {
                   angular.forEach(filtered, function (e) {
                       if (e.toUpperCase().indexOf(letter.toUpperCase()) !== -1) {
                           filteredEmp.push(e);
                       }
                   });
               }
               else {
                   filteredEmp = filtered;
               }
               return filteredEmp;
           };
       });