import firebase from 'firebase'

export async function getMydatas(name_filter = '', value = '') {
    const listKey = []
    const listAnuncios = []

    await firebase.database().ref('/Anuncios')
    .once("value", snapshot => {
        Object.keys(snapshot.val()).forEach((key) => {
            listKey.push(key)
        })


        listKey.forEach(key => {
            firebase.database()
            .ref('/Anuncios')
            .child(key)
            .once("value", snapshot => {
                Object.keys(snapshot.val()).forEach((key2) => {
                firebase.database()
                    .ref('/Anuncios')
                    .child(`${key}/${key2}`)
                    .once("value", item => {
                        if(name_filter) {
                            if(item.val()[name_filter] === value) {
                                listAnuncios.push(item.val())
                            }
                        } else {
                            listAnuncios.push(item.val())
                        }
                    }) 
                })

            })
        })
    })

    return listAnuncios
}