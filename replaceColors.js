const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
    { from: /\[#22D3EE\]/g, to: 'primary' },
    { from: /#22D3EE/gi, to: 'var(--color-primary)' }, // For inline styles
    { from: /\[#0F172A\]/gi, to: 'bg-main' },
    { from: /\[#1E293B\]/gi, to: 'card-bg' },
    { from: /\[#A78BFA\]/gi, to: 'secondary' }
];

function processDirectory(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stat) => {
                if (err) throw err;

                if (stat.isDirectory()) {
                    processDirectory(filePath);
                } else if (filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) throw err;

                        let newData = data;
                        replacements.forEach(rep => {
                            newData = newData.replace(rep.from, rep.to);
                        });

                        if (newData !== data) {
                            fs.writeFile(filePath, newData, 'utf8', err => {
                                if (err) throw err;
                                console.log(`Updated ${filePath}`);
                            });
                        }
                    });
                }
            });
        });
    });
}

processDirectory(directoryPath);
