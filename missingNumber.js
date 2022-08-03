function missing (arr){
    let sum=0
     for(let i=0;i<arr.length;i++){
         sum = sum + arr[i]
     }
     let n=arr.length+1
     finalsum = Math.floor((n*(n+1))/2)
     return finalsum - sum
 }
 console.log(missing([1,2,3,5,6,7,8]))
