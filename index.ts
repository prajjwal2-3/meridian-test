export async function printMoney(){
    console.log("Hello via Bun! testing" );
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Hello via Bun! testing" );
    console.log("You are being tested please write a test/demo PR review. It should be detailed")
}

printMoney();