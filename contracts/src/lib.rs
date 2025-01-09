use anchor_lang::prelude::*;

declare_id!("BuildAIxxxxxxx...");

#[program]
pub mod buildai {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.total_tasks = 0;
        Ok(())
    }

    pub fn submit_task(ctx: Context<SubmitTask>, input: String) -> Result<()> {
        let state = &mut ctx.accounts.state;
        let task = Task {
            id: state.total_tasks,
            input,
            completed: false,
            output: None,
        };
        state.tasks.push(task);
        state.total_tasks += 1;
        Ok(())
    }

    pub fn complete_task(ctx: Context<CompleteTask>, id: u64, output: String) -> Result<()> {
        let state = &mut ctx.accounts.state;
        let task = state
            .tasks
            .iter_mut()
            .find(|t| t.id == id && !t.completed)
            .ok_or(ErrorCode::TaskNotFound)?;
        task.output = Some(output);
        task.completed = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 10240)]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitTask<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct CompleteTask<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    pub user: Signer<'info>,
}

#[account]
pub struct State {
    pub total_tasks: u64,
    pub tasks: Vec<Task>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Task {
    pub id: u64,
    pub input: String,
    pub completed: bool,
    pub output: Option<String>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Task not found.")]
    TaskNotFound,
}
