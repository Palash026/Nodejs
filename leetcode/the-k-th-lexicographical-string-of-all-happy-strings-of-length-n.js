var getHappyString = function(n, k) {
    let res = [];

    function dfs(str){
        if(str.length === n){
            res.push(str);
            return;
        }

        for(let c of 'abc'){
            if(str[str.length - 1] !== c){
                dfs(str + c);
            }
        }
    }

    dfs('');
    return res[k - 1] || '';
}

getHappyString(3, 9); // Output: 'cab'