# CB Sync Master - Windows Task Scheduler Setup Script
$ProjectPath = "c:\Users\forev\myDev\me"
$BatFile = "$ProjectPath\CB_Sync_Master.bat"

# Define the tasks
$Tasks = @(
    @{ Name = "CB_Sync_Monday";  Day = "Monday"; Time = "10:00" },
    @{ Name = "CB_Sync_Friday";  Day = "Friday"; Time = "14:00" }
)

foreach ($item in $Tasks) {
    $TaskName = $item.Name
    $Day = $item.Day
    $Time = $item.Time

    echo "------------------------------------------------"
    echo "⚙️  Setting up Task: $TaskName ($Day at $Time)"

    # Create the action (Must specify working directory)
    $Action = New-ScheduledTaskAction -Execute $BatFile -WorkingDirectory $ProjectPath

    # Create the trigger
    $Trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek $Day -At $Time

    # Register the task
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Description "Automated CB Metadata Sync for War Room ($Day)" -Force
    
    echo "✅ Task registered successfully."
}

echo "------------------------------------------------"
echo "🚀 All tasks have been scheduled!"
echo "You can view them in 'Task Scheduler' under these names:"
echo "- CB_Sync_Monday"
echo "- CB_Sync_Friday"
echo "------------------------------------------------"
