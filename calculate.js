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
    //Index 0 is gcd, 1 is x and 2 is y where gcd = ax + by
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

function is_prime(n){
    //Returns true if n is prime, false if n is not prime.
    for(let i = 2; i <= math_sqrt(n); i = i + 1){
        if(n%i === 0){
            return false;
        }else{}
    }
    
    return true;
}

function convert_to_decimal(number, base){
    // number must in a list 
    // accomodate up to base-16 
    // eg. convert_to_decimal(list(1,1,0,"A"), 14);
    const alphabets = ["A","B","C","D","E","F"];
    
    function find_index(alp){
        for(let i = 0; i < array_length(alphabets); i = i + 1){
            if(alphabets[i] === alp){
                return i;
            } else {}
        }
        
        return undefined; // error
    }
    
    const lookup = x => is_number(x)
        ? x 
        : find_index(x) + 10;
                
    function helper(number, base, index){
        return is_null(number)
            ? 0 
            : lookup(head(number)) *  math_pow(base, index) 
                + helper(tail(number), base, index + 1);
    }
    
    return helper(reverse(number), base, 0);
}

function multi_inverse(a, n){
    //Find multiplicative inverse of a mod n, returns 0 if it does not exist
    let bezout_result = bezout(a,n);
    if(bezout_result[0] !== 1){
    	// no multiplicative inverse since a and n are not co-prime
	return 0;
    } else {
    	return bezout_result[1];
    }
}
