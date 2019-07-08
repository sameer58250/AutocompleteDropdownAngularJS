/// <reference path="C:\Users\sahmad28\Desktop\DevWork\autocompleteDropdownAngular\autocompleteDropdownAngular\scripts/angular/angular.min.js" />
'use strict'
angular.module('indexModule')
       .controller('indexController', ['$scope', 'appData', '$filter', function ($scope, appData, $filter) {
           //variables
           $scope.data = appData;
           var filteredEmp = $filter('filterEmployee')($scope.data, '', '');
           $scope.displyTeam = false;
           $scope.displyEmployee = false;
           $scope.focusedIndex = 0;
           var modal = document.getElementById("myModal");

           //methods
           $scope.selectTeam = selectTeam;
           $scope.selectEmployee = selectEmployee;
           $scope.sendEmail = sendEmail;
           $scope.handleKeyDownTeam = handleKeyDownTeam;
           $scope.closeDropdown = closeDropdown;
           $scope.dropdownBtnClick = dropdownBtnClick;
           $scope.openModal = openModal;
           $scope.closeModal = closeModal;
           $scope.textChange = textChange;
           $scope.stop = stop;

           function selectTeam(team) {
               $scope.Team = team.Team;
               $scope.displyTeam = false;
               var s = team.Employee.join();
               if ($scope.selectedEmplyee && s.indexOf($scope.selectedEmplyee) == -1)
                   $scope.selectedEmplyee = '';
           }

           function selectEmployee(emp) {
               $scope.displyEmployee = false;
               $scope.selectedEmplyee = emp;
           }

           function sendEmail() {
               $scope.error = '';
               $scope.info = '';
               $scope.displyTeam = false;
               $scope.displyEmployee = false;
               var isEmp = false, isTeam = false;
               if ($scope.selectedEmplyee) {
                   angular.forEach(filteredEmp, function (emp) {
                       if (emp === $scope.selectedEmplyee)
                           isEmp = true;
                   });
               }
               if ($scope.Team) {
                   angular.forEach($scope.data, function (tm) {
                       if (tm.Team === $scope.Team)
                           isTeam = true;
                   });
               }
               if (!isEmp || !isTeam)
                   $scope.error = 'Please select from both the dropdowns.';
               else {
                   $scope.info='Email successfully sent to "' + $scope.selectedEmplyee + '" from "' + $scope.Team + '" team.';
                   $scope.selectedEmplyee = '';
                   $scope.Team = '';
               }
           }

           function textChange(type) {
               if (type === 'Team') {
                   var filteredTeam = $filter('filterTeam')($scope.data, $scope.Team);
                   if (filteredTeam.length === 0)
                       $scope.displyTeam = false;
                   else
                       $scope.displyTeam = true;
                   $scope.displyEmployee = false;
               }
               else {
                   var filteredEmployee = $filter('filterEmployee')($scope.data, $scope.Team, $scope.selectedEmplyee);
                   if (filteredEmployee.length === 0)
                       $scope.displyEmployee = false;
                   else
                       $scope.displyEmployee = true;
                   $scope.displyTeam = false;
               }
           }

           function handleKeyDownTeam($event, type) {
               var keyCode = $event.keyCode;
               var filteredTeam = $filter('filterTeam')($scope.data, $scope.Team);
               var filteredEmployee = $filter('filterEmployee')($scope.data, $scope.Team, $scope.selectedEmplyee);
               var maxLength = type === 'Team' ? filteredTeam.length - 1 : filteredEmployee.length - 1;
               if (keyCode === 40) {
                   textChange(type);
                   $event.preventDefault();
                   if ($scope.focusedIndex < maxLength) {
                       $scope.focusedIndex++;
                   }
                   else {
                       $scope.focusedIndex = 0;
                   }
                   adjustScrollBar(type);
               }
               else if (keyCode === 38) {
                   textChange(type);
                   $event.preventDefault();
                   if ($scope.focusedIndex !== 0) {
                       $scope.focusedIndex--;
                   }
                   else {
                       $scope.focusedIndex = maxLength;
                   }
                   adjustScrollBar(type);
               }
               else if (keyCode === 13 && $scope.focusedIndex >= 0) {
                   $event.preventDefault();
                   if (type === 'Team') {
                       selectTeam(filteredTeam[$scope.focusedIndex]);
                   }
                   else {
                       selectEmployee(filteredEmployee[$scope.focusedIndex]);
                   }
               }
           };

           function adjustScrollBar(type) {
               var scroll = type === 'Team' ? document.getElementById('team' + $scope.focusedIndex) : document.getElementById('employee' + $scope.focusedIndex);
               if (scroll)
                   scroll.scrollIntoView();
           }
           
           function closeDropdown() {
               $scope.displyTeam = false;
               $scope.displyEmployee = false;
           }

           function dropdownBtnClick($event, type) {
               if (type === 'Team') {
                   $scope.displyTeam = !$scope.displyTeam
               }
               else {
                   $scope.displyEmployee = !$scope.displyEmployee;
               }
               $scope.focusedIndex = 0;
               $event.stopPropagation()
           }

           function openModal() {
               modal.style.display = 'block';
           }

           function closeModal() {
               modal.style.display = "none";
               $scope.error = '';
               $scope.info = '';
               $scope.selectedEmplyee = '';
               $scope.Team = '';
           }
           
           window.onclick = function (event) {
               if (event.target == modal) {
                   closeModal();
               }
           }

           function stop(e) {
               e.stopPropagation();
           }
       }]);
