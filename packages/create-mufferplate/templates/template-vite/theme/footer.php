<footer>
</footer>
<?php if ($get_dev == "true"): ?>
    <script type="module" src="http://localhost:5173/@vite/client"></script>
    <script type="module" src="http://localhost:5173/src/main.ts"></script>
    <script type="module" src="http://localhost:5173/src/form.ts"></script>
<?php else: ?>
    <script type="module" src="<?= domain ?>assets/js/main.js<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>"></script>
    <script type="module" src="<?= domain ?>assets/js/form.js<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>" defer></script>
<?php endif; ?>
</body>
</html>