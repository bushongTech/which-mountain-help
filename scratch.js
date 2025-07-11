document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#service-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const iframe = document.getElementById('content-frame');
            switch (button.textContent.trim()) {
                case 'Static Fire Test Data Uploader':
                    iframe.src = '/tdms-uploader';
                    break;
                case 'Liner GUI':
                    iframe.src = '/liner-service';
                    break;
                case 'Liner Application GUI':
                    iframe.src = '/liner-application-service';
                    break;
                case 'Cure GUI':
                    iframe.src = '/cure-service';
                    break;
                case 'Materials Database GUI':
                    iframe.src = '/material-service';
                    break;
                case 'Motor Static Fire Analysis Dashboard':
                    iframe.src = '/single_run';
                    break;
                case 'Tensile Testing Dashboard':
                    iframe.src = '/tensile_dashboard';
                    break;
                default:
                    iframe.src = '';
                    break;
            }
        });
    });
});