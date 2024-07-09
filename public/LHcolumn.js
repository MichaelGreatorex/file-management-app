document.addEventListener('DOMContentLoaded', () => {
// Function to generate the sidebar content
function generateSidebar() {
    const LHcolumn = document.getElementById('LHcolumn');

    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    const filesButton = document.createElement('button');
    filesButton.id = 'filesButton';
    filesButton.className = 'dropdown-btn';
    filesButton.textContent = 'Files';

    const dropdownMenu = document.createElement('div');
    dropdownMenu.id = 'dropdownMenu';
    dropdownMenu.className = 'dropdown-container';

    const buttons = [
        'Personal Files', 
        'My Libraries', 
        'Favourite Libraries', 
        'All Libraries', 
        'Recent Files', 
        'Favourites', 
        'Shared', 
        'Trash'
    ];

    buttons.forEach(text => {
        const button = document.createElement('button');
        button.className = 'colbtn';
        button.textContent = text;
        dropdownMenu.appendChild(button);
    });

    sidebar.appendChild(filesButton);
    sidebar.appendChild(dropdownMenu);
    LHcolumn.appendChild(sidebar);

    // Add event listener for the files button
    filesButton.addEventListener('click', function() {
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });
}

// Generate the sidebar on page load
generateSidebar();
});

