use anchor_lang::prelude::*;
use anchor_lang::prelude::ProgramError;
use buildai::program::buildai;
use buildai::{Initialize, SubmitTask, CompleteTask};

#[tokio::test]
async fn test_initialize() {
    let mut program_test = ProgramTest::new("buildai", buildai::id(), processor!(buildai::entry));
    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

    let state_account = Keypair::new();
    let initialize_ix = initialize_instruction(&state_account.pubkey(), &payer.pubkey());
    let transaction = Transaction::new_signed_with_payer(
        &[initialize_ix],
        Some(&payer.pubkey()),
        &[&payer, &state_account],
        recent_blockhash,
    );

    banks_client.process_transaction(transaction).await.unwrap();
    let state: State = banks_client.get_account_data(&state_account.pubkey()).await.unwrap();
    assert_eq!(state.total_tasks, 0);
}

#[tokio::test]
async fn test_submit_task() {
    let task_input = "Test task input".to_string();
    let submit_task_ix = submit_task_instruction(&state_account.pubkey(), &payer.pubkey(), task_input);
    // Include logic to test task submission...
}

#[tokio::test]
async fn test_complete_task() {
    let task_id = 1;
    let task_output = "Test output".to_string();
    let complete_task_ix = complete_task_instruction(&state_account.pubkey(), &payer.pubkey(), task_id, task_output);
    // Include logic to test task completion...
}
