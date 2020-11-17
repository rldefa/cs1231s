function gcd(a,b){
    //The Euclidean Algorithm
	while(b !== 0){
		const temp = a%b;
		a = b;
		b = temp;
		display(pair(a,b));
	}

	return a;
}

function base_converter(value, base_out){
    //From base-10 to desired number.
    function alphabets(x){
        //Converts numbers greater than 9 to respective alphabet.
        const arr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        if (x<10){
            return stringify(x);
        }else{
            return arr[x - 10];
        }
    }
    
    let final = "";
    while (value !== 0){
        const rem = value%base_out;
        value = math_floor(value/base_out);
        final = alphabets(rem) + final;
    }
    
    return final;
}

function bezout(a,b){
    //Index 0 is gcd, 1is x and 2 is y where gcd = ax + by
    let A = [a,1,0];
    let B = [b,0,1];
    
    while(B[0] !== 0){
        let C = [];
		C[0] = A[0]%B[0];
		const div = math_floor(A[0]/B[0]);
		C[1] = A[1] - div*B[1];
		C[2] = A[2] - div*B[2];
		A = B;
		B = C;
	}
    return A;
}
