/*!
governify-render 1.0.0, built on: 2018-05-09
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-render#readme

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

$scope.players = new Set([])
$scope.playersInfo = Array(6)

$scope.i = 0;
$scope.j = 0;
$scope.bote = 0;
$scope.cardValue = { valor:"A" , palo:"C"}
$scope.nameValue = [{}]

$scope.message= ""

$scope.setNameAndBet = (id) => {
    $scope.playersInfo[id].jugador = $scope.nameValue[id].jugador
    $scope.playersInfo[id].apuesta = $scope.nameValue[id].apuesta
}

$scope.addPlayer = (id) => {
    $scope.players.add(id)
    $scope.playersInfo[id] = {jugador:"",apuesta:0,cartas:Array(5)}
}

$scope.deletePlayer = (id) => {
    $scope.players.delete(id)
    $scope.playersInfo[id] = undefined
}

$scope.changeCard = (i,j) =>{
    $scope.i = i;
    $scope.j = j;
    var button = document.getElementById("modalBtn")

    button.click()
}

$scope.saveCard = () => {
    var setHands = new Set($scope.getCardsInHands())

    if (!setHands.has(`${$scope.cardValue.valor}${$scope.cardValue.palo}`)) {
        $scope.playersInfo[$scope.i].cartas[$scope.j] = {...$scope.cardValue}
        $scope.cardValue = { valor:"A" , palo:"C"}
    }
    var button = document.getElementById("modalBtn")
    
    button.click()
}

$scope.getCardsInHands = () => {
   return $scope.playersInfo.map(x => {return x.cartas}).flat().map(y => { return `${y.valor}${y.palo}`})
}


$scope.checkGame = () => {
    var data = {
        bote: $scope.bote,
        jugadas : $scope.playersInfo.filter(x => x !== undefined)
    }
    if(!data.jugadas.some((x) => {
        if(x.cartas.filter(x => x != null).length < 5) return true

        if(x.jugador === "") return true
        
        return false
    })){

        $http.post("http://localhost:8081/api/v1/hand",[data]).then((res)=>{
            $scope.message = res.data.resultados[0].resultado

            var button = document.getElementById("messageBtn")
    
            console.log(button)
            button.click() 
        },(err)=>{console.error(err)})
    }
    
}