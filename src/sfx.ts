export function playSound(name: string){
    const snd = new Audio(name + ".mp3")
    snd.play()
}

export function playMusicLoop(){
    const music = new Audio("music.mp3")
    music.loop = true
    music.play()
}