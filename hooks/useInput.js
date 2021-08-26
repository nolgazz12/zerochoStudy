import { useState , useCallback } from "react";

export default ( initicialValue = null) => {
    const [value , setValue ] = useState(initicialValue)
    const handler = useCallback((e) => {
        setValue(e.target.value)
    },[])
    return [value , handler]
}