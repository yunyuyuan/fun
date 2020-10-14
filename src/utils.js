import ReactDom from 'react-dom';

export function doMount (el){
    ReactDom.render(el, document.getElementById('root'))
}

export function urlSearchMap (){
    const search = window.location.search,
        map = {};
    for (let i of search.match(/[?&]([^=]*)=([^&]*)/g)){
        let key = i.replace(/[?&]([^=]*)=([^&]*)/, '$1'),
            val = i.replace(/[?&]([^=]*)=([^&]*)/, '$2');
        if (Object.keys(map).indexOf(key) !== -1){
            if (typeof map[key] == 'string'){
                map[key] = [map[key], val]
            }else{
                map[key].push(val)
            }
        }else{
            map[key] = val
        }
    }
    return map
}