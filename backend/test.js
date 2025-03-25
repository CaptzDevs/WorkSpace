let permissionGranted = ['0000']
let selectedPermission = ['1000' , '2000' , '3000' ]

let revokePermission = permissionGranted.filter((item)=> !selectedPermission.includes(item))
let newPermission = selectedPermission.filter((item)=> !permissionGranted.includes(item))

console.log("New    : ",newPermission);
console.log("Revoke : ",revokePermission);






