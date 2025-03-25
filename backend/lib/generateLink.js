

export function generateLink(token) {
    const alphanumericChars = token.match(/[a-z0-9]/ig).join('');
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += alphanumericChars[Math.floor(Math.random() * alphanumericChars.length)];
    }
    code += '-';
    for (let i = 0; i < 4; i++) {
        code += alphanumericChars[Math.floor(Math.random() * alphanumericChars.length)];
    }

    return code.toLowerCase();
}

/* 
console.log(generateLink('0060b39d87b928d4d909391bd17459d8922IADEqTU7bFl+R6clvyxBhgOdEgiEmbvz5c5vtnWF6s8uQDLRTXgAAAAAIgC5RJYdsgO7ZQQAAQBCwLllAgBCwLllAwBCwLllBABCwLll'));
console.log(generateLink('0060b39d87b928d4d909391bd17459d8922IABf84dpWztPZ/una7m9f9H6hjYqalW+WLkO99J6ecG+AjLRTXgAAAAAIgBTqmCwggS7ZQQAAQASwbllAgASwbllAwASwbllBAASwbll'));
console.log(generateLink('0060b39d87b928d4d909391bd17459d8922IAC0KfweJhOq33LmsgmFp7QSzrpbgRI7ZokM+G3W96FWyzLRTXgAAAAAIgDoaFPAmAS7ZQQAAQAowbllAgAowbllAwAowbllBAAowbll'));
console.log(generateLink('0060b39d87b928d4d909391bd17459d8922IADb08jghFWGUmWDA3qjy7eWWEgEnDn7+EgqqUrIMao0qjLRTXgAAAAAIgD5y8gF/Qe7ZQQAAQCNxLllAgCNxLllAwCNxLllBACNxLll'));
console.log(generateLink('0060b39d87b928d4d909391bd17459d8922IAA/XJ9ZAUbGaq74qAw6uoYmWcDmYOtXAyWPNN65iw35yTLRTXgAAAAAIgCPddH6Kwm7ZQQAAQC7xbllAgC7xbllAwC7xbllBAC7xbll'));
console.log(generateLink('0060b39d87b928d4d909391bd17459d8922IABw2Zf7IGMomrJH587XmhxbwI+s2vw2d4NkYI97RXc+BzLRTXgAAAAAIgCB0ODYGgu7ZQQAAQCqx7llAgCqx7llAwCqx7llBACqx7ll'));
 */