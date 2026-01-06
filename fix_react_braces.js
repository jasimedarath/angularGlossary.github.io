const fs = require('fs');
const path = require('path');

function fixCurlyBracesInTemplateLiterals(content) {
    // Replace { and } with &#123; and &#125; only within backtick template literals
    // This regex matches backtick template literals
    return content.replace(/`([^`]*)`/gs, (match, innerContent) => {
        const modified = innerContent
            .replace(/\{/g, '&#123;')
            .replace(/\}/g, '&#125;');
        return `\`${modified}\``;
    });
}

function getAllReactComponentFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getAllReactComponentFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.component.ts') && !entry.name.includes('.spec.')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

function main() {
    const reactDir = path.join('src', 'app', 'components', 'react');
    const files = getAllReactComponentFiles(reactDir);
    const summary = [];
    
    for (const filePath of files) {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const modifiedContent = fixCurlyBracesInTemplateLiterals(originalContent);
        
        if (originalContent !== modifiedContent) {
            // Count replacements (approximate by counting braces in template literals)
            const originalBraces = (originalContent.match(/`[^`]*[{}][^`]*/g) || []).join('').match(/[{}]/g) || [];
            const replacements = originalBraces.length;
            
            fs.writeFileSync(filePath, modifiedContent, 'utf8');
            
            summary.push({
                file: path.basename(filePath),
                replacements: replacements
            });
        }
    }
    
    // Print summary
    console.log('\n=== SUMMARY ===\n');
    console.log('File'.padEnd(45) + 'Replacements');
    console.log('-'.repeat(60));
    
    summary.sort((a, b) => a.file.localeCompare(b.file));
    for (const item of summary) {
        console.log(item.file.padEnd(45) + item.replacements);
    }
    
    console.log('-'.repeat(60));
    console.log(`\nTotal files fixed: ${summary.length}`);
    console.log(`Total replacements: ${summary.reduce((sum, item) => sum + item.replacements, 0)}`);
}

main();
