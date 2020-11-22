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

// Courtesy of Amadeus
const take_right = (x, xs) => tail(member(x, xs));
const take_left = (x, xs) => reverse(take_right(x, reverse(xs)));
// every item is unique, so no problem 

function to_tree_preorder(preorder, inorder){
    // given preorder and inorder, output the unique tree
    if(is_null(inorder) || is_null(preorder)){
        return null;
    } else if(is_null(member(head(preorder), inorder))){
        return to_tree_preorder(tail(preorder), inorder);
    } else {
        const root = head(preorder);
        
        const left = take_left(root, inorder);
        const right = take_right(root, inorder);
        
        return list(root,
                    to_tree_preorder(tail(preorder), left),
                    to_tree_preorder(tail(preorder), right));
    }
}

function to_tree_postorder(postorder, inorder){
    // given postorder and inorder, output the unique tree 
    const reversed_order = reverse(postorder);
    return to_tree_preorder(reversed_order, inorder);
}

// example to use
// const postorder = list('F', 'C', 'E', 'H', 'D', 'A', 'B', 'G');
// const inorder = list('C', 'F', 'G', 'E', 'D', 'H', 'B', 'A');
// const tree = to_tree_postorder(postorder, inorder);
// display_list(tree);

// Count number of functions mapping A to B,
// with cardinalities m and n respectively
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
const choose = (n, r) => factorial(n) / (factorial(n - r) * factorial(r));
const permute = (n, r) => factorial(n) / factorial(n - r);

function num_func(m, n){
    return math_pow(n, m);
}

function injective(m, n){
    return m > n ? 0 : permute(n, m);
}

function surjective(m, n){
    let result = 0;
    for(let i = 0; i <= n - 1; i = i + 1){
        result = result + math_pow(-1, i) * choose(n, i) * math_pow(n - i, m);
    }
    return result;
}

function bijective(m, n){
    return m === n ? factorial(m) : 0;
}
