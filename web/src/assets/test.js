$$('.news-nav >li').map((v, k) => {
    return {
        name: v.innerText,
        list: $$('li', $$('.news-slide-wrapper > ul')[k]).map((i) => {
                return {carory:$$('a .category',i)[0].innerText,
                content:$$('a .title',i)[0].innerText,
             time:$$('a .time',i)[0].innerText}
            })
        

    }
})