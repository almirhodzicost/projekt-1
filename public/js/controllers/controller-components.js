export function showDialog(dialogOverlay, dialogBox) {
    dialogOverlay.style.display = 'block';
    dialogBox.style.display = 'block';
}

export function closeDialog(dialogOverlay, dialogBox) {
    dialogOverlay.style.display = 'none';
    dialogBox.style.display = 'none';
}

export function openTask(openTaskDetail) {
    openTaskDetail.style.display = 'block';
}

export function closeTask(openTaskDetail) {
    openTaskDetail.style.display = 'none';
}