import BaseRepository from "~/data/repository/BaseRepository"

const repo = new BaseRepository({endpoint: '/admin/upload'})

export async function uploadImageForm(formObj: {[key: string]: any}) {
    const newObj: {[key: string]: any} = {}
    console.log({formObj})
    await Promise.all(Object.keys(formObj).map(async k => {
        if (typeof formObj[k] === 'object' && formObj[k] !== null && (formObj[k]?.name || formObj[k][0]?.name)) {
            if (!!formObj[k]?.name) {
                const data = new FormData()
                data.append('file', formObj[k], formObj[k].name)

                const result = await repo.create(data)
                newObj[k] = result.data[0]?.path || ''
            } else {

                newObj[k] = await Promise.all(formObj[k].map(async (f: any) => {
                    const data = new FormData()
                    data.append('file', f, f.name)
                    const result = await repo.create(data)
                    return result.data[0]?.path || ''
                }))
            }
            
        } else {
            newObj[k] = formObj[k]
        }
    }))
    return newObj
}