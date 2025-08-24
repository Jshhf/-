// 文件上传组件类
class FileUploader {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.fileInfo = document.getElementById('fileInfo');
        this.fileName = document.getElementById('fileName');
        this.lastStepBtn = document.getElementById('lastStepBtn');
        this.finishBtn = document.getElementById('finishBtn');
        
        this.selectedFile = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupDragAndDrop();
    }

    bindEvents() {
        // 点击上传区域打开文件选择框
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // 文件选择事件
        this.fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // 按钮事件
        this.lastStepBtn.addEventListener('click', () => {
            this.handleLastStep();
        });

        this.finishBtn.addEventListener('click', () => {
            this.handleFinish();
        });

        // 键盘事件支持
        this.uploadArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.fileInput.click();
            }
        });

        // 设置上传区域为可聚焦
        this.uploadArea.setAttribute('tabindex', '0');
        this.uploadArea.setAttribute('role', 'button');
        this.uploadArea.setAttribute('aria-label', '点击或拖拽上传简历文件');
    }

    setupDragAndDrop() {
        // 阻止默认拖拽行为
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // 拖拽进入
        ['dragenter', 'dragover'].forEach(eventName => {
            this.uploadArea.addEventListener(eventName, () => {
                this.uploadArea.classList.add('dragover');
            });
        });

        // 拖拽离开
        ['dragleave', 'drop'].forEach(eventName => {
            this.uploadArea.addEventListener(eventName, () => {
                this.uploadArea.classList.remove('dragover');
            });
        });

        // 文件拖拽放置
        this.uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });
    }

    handleFileSelect(file) {
        if (!file) return;

        // 验证文件类型
        const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!allowedTypes.includes(fileExtension)) {
            this.showError('不支持的文件类型，请上传 PDF、DOC、DOCX 或 TXT 文件');
            return;
        }

        // 验证文件大小 (最大 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showError('文件大小不能超过 10MB');
            return;
        }

        this.selectedFile = file;
        this.displayFileInfo(file);
        this.uploadArea.classList.add('success');
        this.uploadArea.classList.remove('error');
        
        // 显示成功消息
        this.showSuccess(`文件 "${file.name}" 已选择`);
    }

    displayFileInfo(file) {
        this.fileName.textContent = file.name;
        this.fileInfo.style.display = 'flex';
        
        // 隐藏上传图标和说明文字
        const uploadIcon = this.uploadArea.querySelector('.upload-icon');
        const uploadInstruction = this.uploadArea.querySelector('.upload-instruction');
        
        if (uploadIcon) uploadIcon.style.display = 'none';
        if (uploadInstruction) uploadInstruction.style.display = 'none';
    }

    showError(message) {
        this.uploadArea.classList.add('error');
        this.uploadArea.classList.remove('success');
        
        // 创建错误提示
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #e74c3c;
            background: #fdf2f2;
            padding: 10px;
            border-radius: 8px;
            margin-top: 15px;
            font-size: 0.9rem;
        `;
        errorDiv.textContent = message;
        
        // 移除之前的错误信息
        const existingError = this.uploadArea.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        this.uploadArea.appendChild(errorDiv);
        
        // 3秒后自动移除错误信息
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
            this.uploadArea.classList.remove('error');
        }, 3000);
    }

    showSuccess(message) {
        // 创建成功提示
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            color: #27ae60;
            background: #e8f5e8;
            padding: 10px;
            border-radius: 8px;
            margin-top: 15px;
            font-size: 0.9rem;
        `;
        successDiv.textContent = message;
        
        // 移除之前的成功信息
        const existingSuccess = this.uploadArea.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        this.uploadArea.appendChild(successDiv);
        
        // 3秒后自动移除成功信息
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }

    handleLastStep() {
        // 添加按钮点击效果
        this.lastStepBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.lastStepBtn.style.transform = '';
        }, 150);

        // 模拟返回上一步
        console.log('返回上一步');
        alert('返回上一步功能');
    }

    handleFinish() {
        // 添加按钮点击效果
        this.finishBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.finishBtn.style.transform = '';
        }, 150);

        if (!this.selectedFile) {
            alert('请先选择要上传的简历文件');
            return;
        }

        // 模拟文件上传
        this.simulateUpload();
    }

    simulateUpload() {
        // 显示上传状态
        this.uploadArea.classList.add('uploading');
        this.uploadArea.classList.remove('success', 'error');
        
        // 更新上传区域内容
        const uploadContent = this.uploadArea.innerHTML;
        this.uploadArea.innerHTML = `
            <div class="upload-icon">
                <i class="fas fa-spinner fa-spin" style="color: #f39c12;"></i>
            </div>
            <p class="upload-instruction">正在上传文件...</p>
        `;

        // 模拟上传进度
        setTimeout(() => {
            this.uploadArea.innerHTML = `
                <div class="upload-icon">
                    <i class="fas fa-check-circle" style="color: #27ae60; font-size: 3rem;"></i>
                </div>
                <p class="upload-instruction">文件上传成功！</p>
                <div class="file-info" style="display: flex;">
                    <i class="fas fa-file-alt"></i>
                    <span>${this.selectedFile.name}</span>
                </div>
            `;
            
            this.uploadArea.classList.remove('uploading');
            this.uploadArea.classList.add('success');
            
            // 显示完成消息
            setTimeout(() => {
                alert('简历上传完成！平台将帮助您解析和优化简历。');
            }, 500);
        }, 2000);
    }

    // 重置上传区域
    reset() {
        this.selectedFile = null;
        this.fileInfo.style.display = 'none';
        this.uploadArea.classList.remove('success', 'error', 'uploading', 'dragover');
        
        // 恢复原始内容
        this.uploadArea.innerHTML = `
            <input type="file" id="fileInput" accept=".pdf,.doc,.docx,.txt" style="display: none;">
            <div class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <p class="upload-instruction">
                Drag your resume file to this area, or click on the area to select the appropriate file to upload
            </p>
            <div class="file-info" id="fileInfo" style="display: none;">
                <i class="fas fa-file-alt"></i>
                <span id="fileName"></span>
            </div>
        `;
        
        // 重新绑定事件
        this.fileInput = document.getElementById('fileInput');
        this.fileInfo = document.getElementById('fileInfo');
        this.fileName = document.getElementById('fileName');
        this.bindEvents();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化文件上传组件
    const fileUploader = new FileUploader();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 添加键盘快捷键支持
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter 完成上传
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            fileUploader.handleFinish();
        }
        
        // Escape 重置上传
        if (e.key === 'Escape') {
            fileUploader.reset();
        }
    });

    // 添加触摸设备支持
    if ('ontouchstart' in window) {
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            uploadArea.style.transform = 'scale(0.98)';
        });
        
        uploadArea.addEventListener('touchend', (e) => {
            e.preventDefault();
            uploadArea.style.transform = '';
            fileUploader.fileInput.click();
        });
    }

    // 添加窗口大小变化监听
    window.addEventListener('resize', () => {
        // 可以在这里添加响应式相关的逻辑
        console.log('窗口大小已改变');
    });

    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('页面已隐藏');
        } else {
            console.log('页面已显示');
        }
    });
});

// 工具函数
const utils = {
    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // 获取文件扩展名
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    },

    // 验证文件类型
    isValidFileType(filename, allowedTypes) {
        const extension = this.getFileExtension(filename).toLowerCase();
        return allowedTypes.includes('.' + extension);
    }
};
