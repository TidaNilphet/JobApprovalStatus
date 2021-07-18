import React, { useState } from 'react';
const AuthContext = React.createContext([{}, () => { }]);

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };