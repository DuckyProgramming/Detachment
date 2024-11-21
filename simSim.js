function setup(){
	tick=0
	totals=[
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ]
    groups=[
        [0,1,6],
        [1,2,7],
        [2,3,8],
        [3,4,9],
        [4,5,10],
        [0,5,11],

        [0,7,12],
        [0,10,13],
        [1,8,13],
        [1,11,14],
        [2,6,13],
        [2,9,14],
        [3,7,13],
        [3,10,12],
        [4,8,14],
        [4,11,13],
        [5,6,14],
        [5,9,12],

        [6,8,10],
        [7,9,11],
    ]
    result1=ticTacToeCheck([
        1,0,0,0,0,
        0,0,0,0,0,
        0,0,0,0,0,
    ],1,1,0.4)
    result2=ticTacToeCheck([
        0,0,0,0,0,
        0,1,0,0,0,
        0,0,0,0,0,
    ],1,1,0.4)
    result3=ticTacToeCheck([
        0,0,0,0,0,
        0,0,0,0,0,
        0,0,1,0,0,
    ],1,1,0.2)
    result=min(result1,result2,result3)
	print(['Player 1 Wins','Player 2 Wins'][result])
    for(let a=0,la=totals.length;a<la;a++){
        print(`After ${a} Moves: ${totals[a][0]/(totals[a][0]+totals[a][1])}, ${totals[a][1]/(totals[a][0]+totals[a][1])}`)
    }
}

function copyArrayStack(array){
	let result=[]
	for(let a=0,la=array.length;a<la;a++){
		result.push(array[a].slice())
	}
	return result
}

function ticTacToeCheck(map,turn,total,chance){
	let empty=[]
	for(let a=0,la=map.length;a<la;a++){
		if(map[a]==0){
			empty.push(a)
		}
	}
    if(total>=3){
        for(let a=0,la=groups.length;a<la;a++){
            if(map[groups[a][0]]==1&&map[groups[a][1]]==1&&map[groups[a][2]]==1){
                totals[total][1]+=chance
                return 1
            }
            if(map[groups[a][0]]==2&&map[groups[a][1]]==2&&map[groups[a][2]]==2){
                totals[total][0]+=chance
                return 0
            }
        }
    }
	if(empty.length>0){
        let best=1-turn
		for(let a=0,la=empty.length;a<la;a++){
			let newMap=map.slice()
			newMap[empty[a]]=1+turn
			let result=ticTacToeCheck(newMap,1-turn,1+total,chance/la)
            if(best==1-turn&&result==turn){
                best=turn
            }
		}
		totals[total][best]+=chance
        if(total==3){
            print('mark 12')
        }
        if(total==2){
            print('mark 13')
        }
        if(total==1){
            print('mark 14')
        }
		return best
	}else{
        throw new Error("fail");
	}
}
