export default function terminalLink(text , url){
    console.log(`\x1b]8;;${text}\x1b\\${url}\x1b]8;;\x1b\\`);
}