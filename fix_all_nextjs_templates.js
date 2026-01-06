const fs = require('fs');
const path = require('path');

function fixMalformedTemplateLiterals(content) {
    // Fix pattern: $&#123;\`}...$${ var}${\`&#125; => \`...$&#123;var&#125;\`
    // This regex matches the malformed pattern and captures the variable name
    let fixed = content.replace(/\$&#123;\\`\}([^$]*)\$\$\{([^}]+)\}\$\{\\`&#125;/g, function(match, prefix, varName) {
        var varMarker = "&#123;" + varName + "&#125;";
        return "\\\\\\`" + prefix + "$" + varMarker + "\\\\\\`";
    });
    
    // Fix simpler pattern without prefix: $&#123;\`}$${ var}${\`&#125; => \`$&#123;var&#125;\`
    fixed = fixed.replace(/\$&#123;\\`\}\$\$\{([^}]+)\}\$\{\\`&#125;/g, function(match, varName) {
        var varMarker = "&#123;" + varName + "&#125;";
        return "\\\\\\`$" + varMarker + "\\\\\\`";
    });
    
    // Fix pattern: &#123;$&#123;\`} ... ${\`&#125;&#125; => &#123;\` ... \`&#125;
    fixed = fixed.replace(/&#123;\$&#123;\\`\}([^$]*)\$\{\\`&#125;&#125;/g, function(match, content) {
        return "&#123;\\`" + content + "\\`&#125;";
    });
    
    return fixed;
}

function getAllNextjsComponentFiles(dir) {
    const files = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                files.push(...getAllNextjsComponentFiles(fullPath));
            } else if (entry.isFile() && entry.name.endsWith('.component.ts') && !entry.name.includes('.spec.')) {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }
    
    return files;
}

function main() {
    const nextjsDir = path.join('src', 'app', 'components', 'nextjs');
    const files = getAllNextjsComponentFiles(nextjsDir);
    const summary = [];
    
    console.log(`\n=== FIXING MALFORMED TEMPLATE LITERALS ===\n`);
    console.log(`Found ${files.length} Next.js component files\n`);
    
    for (const filePath of files) {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        
        // Count matches before fixing
        const matchesBefore = (originalContent.match(/\$&#123;\\`\}.*\$\$\{.*\}\$\{\\`&#125;/g) || []).length;
        
        if (matchesBefore > 0) {
            const modifiedContent = fixMalformedTemplateLiterals(originalContent);
            
            if (originalContent !== modifiedContent) {
                fs.writeFileSync(filePath, modifiedContent, 'utf8');
                
                summary.push({
                    file: path.basename(filePath),
                    fixes: matchesBefore
                });
                
                console.log(`✓ Fixed ${matchesBefore} template(s) in ${path.basename(filePath)}`);
            }
        }
    }
    
    console.log('\n' + '-'.repeat(60));
    console.log(`\nTotal files fixed: ${summary.length}`);
    console.log(`Total template literals fixed: ${summary.reduce((sum, item) => sum + item.fixes, 0)}`);
    console.log('\n');
}

main();
